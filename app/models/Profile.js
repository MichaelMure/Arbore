// @flow
import { Record } from 'immutable'
import crypto from 'crypto'
import { gatewayRoot } from 'ipfs/ipfsMain'

export const LOCAL_DATA_VERSION = 1
export const PUBLISH_DATA_VERSION = 1

export const writable = {
  dataVersion: 'dataVersion',
  hash: 'hash',
  identity: 'identity',
  bio: 'bio',
  pubkey: 'pubkey',
  passphrase: 'passphrase',
  avatarHash: 'avatarHash'
}

export const ProfileRecord = Record({
  dataVersion: LOCAL_DATA_VERSION,
  hash: null,
  identity: '',
  bio: '',
  pubkey: null,
  passphrase: null,
  avatarHash: null
}, 'Profile')

export default class Profile extends ProfileRecord {
  dataVersion: number
  hash: ?string
  identity: string
  bio: string
  pubkey: string
  passphrase: string
  avatarHash: ?string

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

  get avatarUrl(): ?string {
    return this.avatarHash ? gatewayRoot + this.avatarHash : null
  }

  get initials(): string {
    const names = this.identity.split(' ')
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }

  // Return the object to be published in IPFS
  get publishObject(): {} {
    return {
      dataVersion: PUBLISH_DATA_VERSION,
      identity: this.identity,
      bio: this.bio,
      pubkey: this.pubkey,
      avatarHash: this.avatarHash,
    }
  }

  get chatPubsubTopic(): string {
    return this.pubkey + '/chat'
  }
}
