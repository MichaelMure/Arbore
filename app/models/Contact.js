// @flow
import { Record } from 'immutable'
import strContain from 'utils/strContain'

export const writable = {
  pubkey: 'pubkey',
  avatarData: 'avatarData',
  avatarHash: 'avatarHash',
  identity: 'identity',
  bio: 'bio',
  hash: 'hash'
}

export const ContactRecord = Record({
  pubkey: null,
  avatarData: null,
  avatarHash: null,
  identity: '',
  bio: '',
  hash: null
}, 'Contact')

export default class Contact extends ContactRecord {
  pubkey: string
  avatarData: ?string
  avatarHash: ?string
  identity: string
  bio: string
  hash: ?string

  static create(identity : string, avatarData: string, pubkey: string) : Contact {
    return new this().withMutations(contact => contact
      .set(writable.identity, identity)
      .set(writable.avatarData, avatarData)
      .set(writable.pubkey, pubkey)
    )
  }

  // Return true if the contact match the pattern
  match(pattern: string): boolean {
    return strContain(this.identity, pattern) || strContain(this.bio, pattern)
  }
}
