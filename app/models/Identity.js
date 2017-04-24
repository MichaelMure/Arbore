// @flow
import { Record } from 'immutable'

/**
 * Used to store identity/account for the login screen
 */

export const writable = {
  identity: 'identity',
  avatarData: 'avatarData',
  pubkey: 'pubkey'
}

export const IdentityRecord = Record({
  identity: '',
  avatarData: null,
  pubkey: null
}, 'Identity')

export default class Identity extends IdentityRecord {
  identity: string
  avatarData: string
  pubkey: string

  static create(identity: string, avatarData: string, pubkey: string) {
    return new this().withMutations(id => id
      .set(writable.identity, identity)
      .set(writable.avatarData, avatarData)
      .set(writable.pubkey, pubkey)
    )
  }
}
