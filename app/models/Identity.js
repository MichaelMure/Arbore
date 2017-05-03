// @flow
import { Record } from 'immutable'
import { gatewayRoot } from 'ipfs/ipfsMain'

/**
 * Used to store identity/account for the login screen
 * Identities are composed of a few properties of a full profile
 */

export const writable = {
  identity: 'identity',
  avatarHash: 'avatarHash',
  pubkey: 'pubkey'
}

export const IdentityRecord = Record({
  identity: '',
  avatarHash: null,
  pubkey: null
}, 'Identity')

export default class Identity extends IdentityRecord {
  identity: string
  avatarHash: ?string
  pubkey: string

  static create(identity: string, avatarHash: ?string, pubkey: string) {
    return new this().withMutations(id => id
      .set(writable.identity, identity)
      .set(writable.avatarHash, avatarHash)
      .set(writable.pubkey, pubkey)
    )
  }

  get avatarUrl(): ?string {
    return this.avatarHash ? gatewayRoot + this.avatarHash : null
  }
}
