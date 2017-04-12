// @flow
import { createAction } from 'redux-actions'
import { writable } from '../models/Profile'
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import { waitForIpfsReady } from '../ipfs/ipfsRenderer'
import type { Store } from '../utils/types'

export const create = createAction('PROFILE_CREATE')
export const update = createAction('PROFILE_UPDATE')
export const changeAvatar = createAction('PROFILE_AVATAR_SET',
  (hash: string, data: Buffer) => ({hash, data})
)
export const setHash = createAction('PROFILE_HASH_SET',
  (hash: string) => (hash)
)

export function publishAvatar(avatar: Buffer) {
  return function (dispatch) {
    console.log('Publish avatar')
    waitForIpfsReady().then(() => {
      IpfsConnector.getInstance().api.addFile(avatar)
        .then(({hash}) => {
          console.log('avatar hash: ' + hash)
          dispatch(changeAvatar(hash, avatar))
          dispatch(publishProfile())
        })
    })
  }
}

export function publishProfile() {
  return function (dispatch, getState) {
    console.log('Publish profile')
    waitForIpfsReady().then(() => {
      const state: Store = getState()
      const obj = state.profile
        .delete(writable.hash)
        .delete(writable.avatarData)
        .toObject()
      IpfsConnector.getInstance().api.createNode(obj, [])
        .then(({hash}) => {
          console.log('profile hash: ' + hash)
          dispatch(setHash(hash))
        })
    })
  }
}
