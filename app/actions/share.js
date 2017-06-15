// @flow
import { createAction } from 'redux-actions'
import Share from 'models/Share'
import Contact from 'models/Contact'
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import type { IpfsObject } from 'models/IpfsObject'
import { waitForIpfsReady } from 'ipfs/index'
import path from 'path'

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
    console.log('Trigger download of ' + share.metadata.title)

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

export function createShare(title: string, description: string, recipients: Array<Contact>, content: Array) {
  return async function* (dispatch) {
    const instance = IpfsConnector.getInstance()
    await waitForIpfsReady()

    const objects = []

    let addedSize = 0
    const totalSize = content.reduce((a,b) => a + b.size, 0)

    for(const {path: contentPath, size, directory} of content) {

      // Feedback with the progress
      yield {
        progress: addedSize / totalSize,
        nextProgress: (addedSize + size) / totalSize,
        adding: path.basename(contentPath)
      }

      const result = await instance.api.apiClient.util.addFromFs(contentPath, {
        recursive: true,
        hidden: true,
        // ignore: ['subfolder/to/ignore/**']
      })

      addedSize += size

      objects.push(directory
        ? result.last()
        : result
      )
    }

    return objects
  }
}
