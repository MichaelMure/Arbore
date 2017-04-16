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
    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    waitForIpfsReady()
      .then(() => ipfs.api.addFile(avatar))
      .then(({hash}) => {
        console.log('avatar hash: ' + hash)
        dispatch(changeAvatar(hash, avatar))
        dispatch(publishProfile())
      })
  }
}

import * as contactList from './contact'

export function publishProfile() {
  return function (dispatch, getState) {
    console.log('Publish profile')
    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    waitForIpfsReady()
      .then(() => {
        const state: Store = getState()
        const obj = state.profile
        // TODO: doesn't reallly remove the property, toMap() ? toJs ?
          .delete(writable.hash)
          .delete(writable.avatarData)
          .toObject()
        return ipfs.api.createNode(obj, [])
      })
      .then(({hash}) => {
        console.log('profile hash: ' + hash)
        dispatch(setHash(hash))
        return hash
      })
      .then(hash => ipfs.api.apiClient.name.publish(hash))
      .then(() => console.log('profile published on IPNS'))

      // TODO: remove
      .then(() => dispatch(contactList.fetchProfile('QmQ6TbUShnjKbnJDSYdxaBb78Dz6fF82NMetDKnau3k7zW')))
  }
}
