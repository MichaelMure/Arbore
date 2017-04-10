// @flow
import { createAction } from 'redux-actions'
import Share from '../models/Share'
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import type { IpfsObject } from '../models/IpfsObject'

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
  return function (dispatch) {
    console.log('TRIGGER DOWNLOAD OF ' + share.metadata.title)

    dispatch(setStarted(share.id))

    const instance = IpfsConnector.getInstance()

    Promise.all(
      share.content.map((x: IpfsObject) =>
        instance.api.apiClient.pin.add(x.hash)
      )
    )
    .then(
      console.log('all pin added')
    )
    .catch(error => {
      console.error(error)
    })
  }
}
