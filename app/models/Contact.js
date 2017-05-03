// @flow
import { Record } from 'immutable'
import strContain from 'utils/strContain'
import { gatewayRoot } from 'ipfs/ipfsMain'

export const writable = {
  pubkey: 'pubkey',
  avatarHash: 'avatarHash',
  identity: 'identity',
  bio: 'bio',
  hash: 'hash'
}

export const ContactRecord = Record({
  pubkey: null,
  avatarHash: null,
  identity: '',
  bio: '',
  hash: null
}, 'Contact')

export default class Contact extends ContactRecord {
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
