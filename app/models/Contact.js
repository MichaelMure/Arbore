// @flow
import { Record } from 'immutable'
import strContain from 'utils/strContain'
import { gatewayRoot } from 'ipfs/ipfsMain'

const LOCAL_DATA_VERSION = 1

export const writable = {
  dataVersion: 'dataVersion',
  pubkey: 'pubkey',
  avatarHash: 'avatarHash',
  identity: 'identity',
  bio: 'bio',
  hash: 'hash'
}

export const ContactRecord = Record({
  dataVersion: LOCAL_DATA_VERSION,
  pubkey: null,
  avatarHash: null,
  identity: '',
  bio: '',
  hash: null
}, 'Contact')

export default class Contact extends ContactRecord {
  dataVersion: number
  pubkey: string
  avatarHash: ?string
  identity: string
  bio: string
  hash: ?string

  static create(identity : string, avatarHash: ?string, pubkey: string) : Contact {
    return new this().withMutations(contact => contact
      .set(writable.identity, identity)
      .set(writable.pubkey, pubkey)
      .set(writable.avatarHash, avatarHash)
    )
  }

  // Return true if the contact match the pattern
  match(pattern: string): boolean {
    return strContain(this.identity, pattern) || strContain(this.bio, pattern)
  }

  get avatarUrl(): ?string {
    return this.avatarHash ? gatewayRoot + this.avatarHash : null
  }
}
