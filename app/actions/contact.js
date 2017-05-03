// @flow
import { createAction } from 'redux-actions'
import Contact from 'models/Contact'
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import { waitForIpfsReady } from 'ipfs/ipfsRenderer'
import removeIpfsPrefix from 'utils/removeIpfsPrefix'

export const addContact = createAction('CONTACT_CREATE',
  (pubkey: string, identity: string, bio: string, avatarHash: string) =>
    ({pubkey, identity, bio, avatarHash})
)
export const setAvatar = createAction('CONTACT_AVATAR_SET',
  (pubkey: string, hash: ?string) => ({pubkey, hash})
)

// TODO: rework with avatar stored in ipfs
export function fetchProfile(pubkey: string) {
  return function (dispatch) {
    console.log('fetch contact profile: ' + pubkey)
    const ipfs = IpfsConnector.getInstance()

    waitForIpfsReady()
      .then(() => ipfs.api.apiClient.name.resolve(pubkey))
      .then(result => { console.log(result); return result})
      .then(({Path}) => ipfs.api.getObject(removeIpfsPrefix(Path)))
      .then(({identity, bio, avatarHash}) => {
        dispatch(addContact(pubkey, identity, bio, avatarHash))
        dispatch(fetchProfileAvatar(pubkey, avatarHash))
      })
  }
}

// TODO: rework with avatar stored in ipfs
export function fetchProfileAvatar(pubkey: string, avatarHash: string) {
  return function (dispatch) {
    console.log('fetch contact avatar: ' + pubkey)
    const ipfs = IpfsConnector.getInstance()

    // TODO: check that the avatar is actually a png file

    waitForIpfsReady()
      .then(() => ipfs.api.getFile(avatarHash))
      .then(data => dispatch(setAvatar(pubkey, data)))
  }
}
