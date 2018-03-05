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
  setPassword: createAction('PROFILE_PASSWORD_SET',
    (password: string) => (password)
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

export function generate(identity: string, password: ?string, bio: ?string, avatar: ?Buffer) {
  return async function (dispatch) {
    let profile = Profile.create(identity, password, bio)
    const storageKey = profile.storageKey

    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    await waitForIpfsReady()
    const pubkey = await dispatch(generateKeys(storageKey, password))

    // Store in IPFS and pin the avatar if any
    let hash = null
    if(avatar) {
      const res = await ipfs.api.addFile(avatar)
      hash = res.hash
      console.log('avatar hash: ' + hash)
    }

    const _identity = Identity.create(identity, hash, storageKey, password !== null)
    dispatch(identityActions.createNewIdentity(_identity))

    profile = profile
      .set(writable.avatarHash, hash)
      .set(writable.pubkey, pubkey)

    const fullStore = await getFullStore(storageKey, identity)
    await fullStore.dispatch(priv.storeNewProfile(profile))

    return _identity
  }
}

/**
 * Generate a local keypair in the IPFS keystore
 *
 * @param name the name of the key in IPFS
 * @param password the password to lock it (NOT USED YET !)
 * @returns {Promise<{ Id: string, Name: string }>} Name: the chosen name, Id: the hash of the public key
 */
export function generateKeys(name: string, password: ?string) {
 // TODO: use password once ipfs keystore is ready
  return async function (dispatch) {
    console.log('Generate keys')
    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    await waitForIpfsReady()

    const result = await ipfs.api.apiClient.key.gen(name, {
      type: 'ed25519',
      size: 4096
    })

    return result.id
  }
}

export function updatePassword(password: string) {
  return function (dispatch) {
    // TODO: change keys password once it's ready in IPFS
    return dispatch(priv.setPassword(Profile.hashPassword(password)))
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
      dispatch(priv.setAvatarHash(hash)),
      loginStore.dispatch(identityActions.setAvatarHash(getState().profile.storageKey, hash))
    ])

    // don't wait while the profile is published
    dispatch(publish())
  }
}

/**
 * Publish the full profile (+avatar) in IPFS and IPNS
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

/**
 * Check if the correct key for the profile is present in IPFS
 */
export function checkKeys() {
  return async function(dispatch, getState) {
    console.log('Check Id keys')
    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    await waitForIpfsReady()

    const profile: Profile = getState().profile

    const keys = await ipfs.api.apiClient.key.list()

    const present = keys.some((element) => (
      element.name === profile.storageKey && element.id === profile.pubkey
    ))

    if(!present) {
      throw 'Identity keys are not present in IPFS'
    }
  }
}

/**
 * Check if the password provided is correct
 */
export function checkPassword(password: ?string) {
  return async function(dispatch, getState) {
    console.log('Check password')

    const profile: Profile = getState().profile

    // handle no password
    if(profile.password === null && (password === '' || password === null || password === undefined)) {
      return
    }

    const correctPassword = await profile.checkPassword(password)

    if(!correctPassword) {
      throw 'Invalid password'
    }
  }
}
