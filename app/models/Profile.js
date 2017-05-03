// @flow
import { Record } from 'immutable'
import crypto from 'crypto'
import encodePng from 'utils/encodePng'

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
  avatarData: ?Buffer
  avatarHash: ?string

  // TODO: ipns id

  static create(identity: string, passphrase: string, bio: string, avatarData: ?Buffer) {
    return new this().withMutations(profile => profile
      .set(writable.identity, identity)
      .set(writable.passphrase, passphrase)
      .set(writable.bio, bio)
      .set(writable.avatarData, avatarData)
    )
  }

  // Generate a truncated hash from the identity string to use as a storage key
  get storageKey(): string {
    const sha256 = crypto.createHash('sha256')
    return sha256.update(this.identity).digest('hex').slice(32)
  }

  get encodedAvatar(): ?string {
    return encodePng(this.avatarData)
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
