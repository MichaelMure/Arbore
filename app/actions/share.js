// @flow
import { createAction } from 'redux-actions'
import Share, { writable } from 'models/Share'
import ShareRecipient from 'models/ShareRecipient'
import Contact from 'models/Contact'
import IpfsFile from 'models/IpfsFile'
import IpfsDirectory from 'models/IpfsDirectory'
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import type { IpfsObject } from 'models/IpfsObject'
import { waitForIpfsReady } from 'ipfs/index'
import { Map } from 'immutable'
import path from 'path'
import * as shareList from 'actions/shareList'

export const addEmptyObject = createAction('SHARE_EMPTY_OBJECT_ADD',
  (id: number, name: string, hash: string) => ({id, name, hash})
)

export const toggleFavorite = createAction('SHARE_FAVORITE_TOGGLE',
  (id: number) => ({id})
)

export const setTitle = createAction('SHARE_TITLE_SET',
  (id: number, title: string) => ({id, title})
)

export const setStarted = createAction('SHARE_STARTED',
  (id: number) => ({id})
)

// Trigger the download of content by pinning the root hashes
// Update the state accordingly
export function triggerDownload(share: Share) {
  return async function (dispatch) {
    console.log('Trigger download of ' + share.title)

    dispatch(setStarted(share.id))

    const instance = IpfsConnector.getInstance()

    await waitForIpfsReady()

    try {
      await Promise.all(
        share.content.map((x: IpfsObject) =>
          instance.api.apiClient.pin.add(x.hash)
        )
      )
      console.log('all pin added')
    } catch (error) {
      console.error(error)
    }
  }
}

// Add the content to IPFS, create and store a new Share
export function createShare(title: string, description: string, recipients: Array<Contact>, content: Array) {
  return async function* (dispatch) {
    const instance = IpfsConnector.getInstance()
    await waitForIpfsReady()

    let objects: Map<string,IpfsObject> = new Map()

    let share = Share.create(null, title, description)

    let addedSize = 0
    let totalSize = 0
    for (let element of content) {
      totalSize += await element.size
    }

    // Add the content to the local IPFS repo
    for(const {path: contentPath, size, directory} of content) {

      // Feedback with the progress
      yield {
        progress: addedSize / totalSize,
        nextProgress: (addedSize + await size) / totalSize,
        adding: path.basename(contentPath)
      }

      const result = await instance.api.apiClient.util.addFromFs(contentPath, {
        recursive: true,
        hidden: true,
        ignore: [
          'Thumbs.db',
          '.DS_Store',
          '.Trashes',
          '.fseventsd',
          '.Spotlight-V100',
          '$Recycle.Bin',
          // 'System Volume Information' // TODO: this one doesn't work
        ]
      })

      addedSize += await size

      // The daemon stream a result object for each element added. We care only for the last (the root element).
      const hash = result[result.length - 1].hash

      objects = objects.set(path.basename(contentPath),
        directory ? IpfsDirectory.create(hash) : IpfsFile.create(hash)
      )
    }

    // store the content
    share = share.set(writable.content, objects)

    // store the recipients
    recipients.forEach((recipient: Contact) => {
      share = share.set(writable.recipients,
        share.recipients.add(ShareRecipient.create(recipient.pubkey))
      )
    })

    dispatch(shareList.addShare(share))
  }
}
