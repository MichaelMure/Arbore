// @flow
import { createAction } from 'redux-actions'
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import { waitForIpfsReady } from 'ipfs/ipfsRenderer'
import { changeStorePrefix, resetStorePrefix } from 'store';
import * as identityList from './identityList'
import Profile, { writable } from 'models/Profile'
import Identity from 'models/Identity'

export const storeNewProfile = createAction('PROFILE_CREATE',
  (profile: Profile) => (profile)
)
export const setAvatarHash = createAction('PROFILE_AVATAR_HASH_SET',
  (hash: string) => (hash)
)
export const setProfileHash = createAction('PROFILE_HASH_SET',
  (hash: string) => (hash)
)

export function generateProfile(identity: string, passphrase: string, bio: ?string, avatar: ?Buffer) {
  return async function (dispatch) {
    let profile = Profile.create(identity, passphrase, bio)
    const storageKey = profile.storageKey

    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    await waitForIpfsReady()
    await dispatch(generateKeys(storageKey, passphrase))
    await changeStorePrefix(storageKey)

    // Store in IPFS and pin the avatar if any
    let hash = null
    if(avatar) {
      const res = await ipfs.api.addFile(avatar)
      hash = res.hash
      console.log('avatar hash: ' + hash)
    }

    const _identity = Identity.create(identity, hash, storageKey)
    profile = profile.set(writable.avatarHash, hash)

    dispatch(identityList.createNewIdentity(_identity))
    dispatch(storeNewProfile(profile))

    await resetStorePrefix()
  }
}

/**
 * Generate a local keypair in the IPFS keystore
 *
 * @param name the name of the key in IPFS
 * @param passphrase the passphrase to lock it (NOT USED YET !)
 * @returns {Promise<{ Id: string, Name: string }>} Name: the chosen name, Id: the hash of the public key
 */
export function generateKeys(name: string, passphrase: string) {
 // TODO: use passphrase once ipfs keystore is ready
  return function (dispatch) {
    console.log('Generate keys')
    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    return waitForIpfsReady()
      .then(() => ipfs.api.apiClient.key.gen(name, {
        type: 'ed25519',
        size: 4096
      }))
  }
}

/**
 * Publish the avatar in IPFS and store the IPFS hash in the current profile
 *
 * @returns {Promise}
 */
// export function publishAvatar() {
//   return function (dispatch, getState) {
//     const avatar: ?Buffer = getState().profile.avatarData
//
//     if(! avatar) {
//       console.log('No avatar to publish')
//       return Promise.resolve()
//     }
//
//     console.log('Publish avatar')
//     const ipfs: IpfsConnector = IpfsConnector.getInstance()
//
//     return waitForIpfsReady()
//       .then(() => ipfs.api.addFile(avatar))
//       .then(({hash}) => {
//         console.log('avatar hash: ' + hash)
//         dispatch(setAvatarHash(hash))
//       })
//   }
// }

/**
 * Publish the full profile (+avatar) in IPFS and IPNS
 * @returns {Promise}
 */
export function publishProfile() {
  return function (dispatch, getState) {
    console.log('Publish profile')
    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    return waitForIpfsReady()
      .then(() => {
        const obj = getState().profile.publishObject
        return ipfs.api.createNode(obj, [])
      })
      .then(({hash}) => {
        console.log('profile hash: ' + hash)
        dispatch(setProfileHash(hash))
        return hash
      })
      .then(hash => ipfs.api.apiClient.name.publish(hash, {
        'lifetime': '8760h', // profile record validity of 1 year
        'ttl': '24h' // profile record should be cached for 1 day (tradeoff between availability and time to propagate)
      }))
      .then(() => console.log('profile published on IPNS'))
  }
}
