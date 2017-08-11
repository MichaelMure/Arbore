// @flow
import { createAction } from 'redux-actions'
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import { waitForIpfsReady } from 'ipfs/index'
import * as identityActions from './identity'
import Profile, { writable } from 'models/Profile'
import Identity from 'models/Identity'
import { getLoginStore, getFullStore } from 'store/index'

export const priv = {
  storeNewProfile: createAction('PROFILE_CREATE',
    (profile: Profile) => (profile)
  ),
  setPassphrase: createAction('PROFILE_PASSPHRASE_SET',
    (passphrase: string) => (passphrase)
  ),
  setAvatarHash: createAction('PROFILE_AVATAR_HASH_SET',
    (hash: ?string) => (hash)
  ),
  setProfileHash: createAction('PROFILE_HASH_SET',
    (hash: string) => (hash)
  ),
}

export const setBio = createAction('PROFILE_BIO_SET',
  (bio: string) => (bio)
)
export const deleteAvatar = createAction('PROFILE_AVATAR_DELETE')

export function generate(identity: string, passphrase: string, bio: ?string, avatar: ?Buffer) {
  return async function (dispatch) {
    let profile = Profile.create(identity, passphrase, bio)
    const storageKey = profile.storageKey

    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    await waitForIpfsReady()
    const { Id } = await dispatch(generateKeys(storageKey, passphrase))

    // Store in IPFS and pin the avatar if any
    let hash = null
    if(avatar) {
      const res = await ipfs.api.addFile(avatar)
      hash = res.hash
      console.log('avatar hash: ' + hash)
    }

    const _identity = Identity.create(identity, hash, storageKey)
    profile = profile
      .set(writable.avatarHash, hash)
      .set(writable.pubkey, Id)

    dispatch(identityActions.createNewIdentity(_identity))

    const fullStore = await getFullStore(storageKey, identity)
    await fullStore.dispatch(priv.storeNewProfile(profile))
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

export function updatePassphrase(passphrase: string) {
  return function (dispatch) {
    // TODO: change keys passphrase once it's ready in IPFS
    return dispatch(priv.setPassphrase(passphrase))
  }
}

export function updateAvatar(avatar: ?Buffer) {
  return async function (dispatch, getState) {
    let hash = null

    if(avatar) {
      const ipfs: IpfsConnector = IpfsConnector.getInstance()

      await waitForIpfsReady()
      const res = await ipfs.api.addFile(avatar)
      hash = res.hash
    }

    const loginStore = await getLoginStore()

    await Promise.all([
      await dispatch(priv.setAvatarHash(hash)),
      await loginStore.dispatch(identityActions.setAvatarHash(getState().profile.storageKey, hash))
    ])

    // don't wait while the profile is published
    dispatch(publish())
  }
}

/**
 * Publish the full profile (+avatar) in IPFS and IPNS
 * @returns {Promise}
 */
export function publish() {
  return async function (dispatch, getState) {
    console.log('Publish profile')
    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    await waitForIpfsReady()

    const profile: Profile = getState().profile
    const data = profile.publishObject

    const {hash} = await ipfs.api.createNode(data, [])
    console.log('profile hash: ' + hash)
    await dispatch(priv.setProfileHash(hash))

    const result = await ipfs.api.apiClient.name.publish(hash, {
      'key': profile.storageKey,
      'lifetime': '8760h', // profile record validity of 1 year
      'ttl': '24h' // profile record should be cached for 1 day (tradeoff between availability and time to propagate)
    })

    console.log('profile published on IPNS: ', result)
  }
}
