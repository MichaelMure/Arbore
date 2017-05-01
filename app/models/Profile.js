// @flow
import { Record } from 'immutable'
import crypto from 'crypto'

const LOCAL_DATA_VERSION = 1
const PUBLISH_DATA_VERSION = 1

export const writable = {
  dataVersion: 'dataVersion',
  hash: 'hash',
  identity: 'identity',
  bio: 'bio',
  passphrase: 'passphrase',
  avatarData: 'avatarData',
  avatarHash: 'avatarHash'
}

export const ProfileRecord = Record({
  dataVersion: LOCAL_DATA_VERSION,
  hash: null,
  identity: '',
  bio: '',
  passphrase: null,
  avatarData: null,
  avatarHash: null
}, 'Profile')

export default class Profile extends ProfileRecord {
  dataVersion: number
  hash: ?string
  identity: string
  bio: string
  passphrase: string
  avatarData: ?string
  avatarHash: ?string

  // TODO: key id, ipns id

  static create(identity: string, passphrase: string, bio: string) {
    return new this().withMutations(profile => profile
      .set(writable.identity, identity)
      .set(writable.passphrase, passphrase)
      .set(writable.bio, bio)
    )
  }

  // Generate a truncated hash from the identity string to use as a storage key
  get storageKey(): string {
    const sha256 = crypto.createHash('sha256')
    return sha256.update(this.identity).digest('hex').slice(32)
  }

  // Return the object to be published in IPFS
  get publishObject(): {} {
    return {
      dataVersion: PUBLISH_DATA_VERSION,
      identity: this.identity,
      bio: this.bio,
      avatarHash: this.avatarHash,
    }
  }
}
