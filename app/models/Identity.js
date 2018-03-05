// @flow
import { Record } from 'immutable'
import { gatewayRoot } from 'ipfs/index'

/**
 * Used to store identity/account for the login screen
 * Identities are composed of a few properties of a full profile
 */

export const writable = {
  identity: 'identity',
  avatarHash: 'avatarHash',
  storageKey: 'storageKey',
  hasPassword: 'hasPassword',
}

export const IdentityRecord = Record({
  identity: '',
  avatarHash: null,
  storageKey: null,
  hasPassword: true,
}, 'Identity')

export default class Identity extends IdentityRecord {
  identity: string
  avatarHash: ?string
  // the redux localstorage prefix for this profile
  storageKey: string
  // weither or not the profile is password protected
  hasPassword: boolean

  static create(identity: string, avatarHash: ?string, storageKey: string, hasPassword: boolean) {
    return new this().withMutations(id => id
      .set(writable.identity, identity)
      .set(writable.avatarHash, avatarHash)
      .set(writable.storageKey, storageKey)
      .set(writable.hasPassword, hasPassword)
    )
  }

  get avatarUrl(): ?string {
    return this.avatarHash ? gatewayRoot + this.avatarHash : null
  }

  get initials(): string {
    const names = this.identity.split(' ')
    let initials = names[0].substring(0, 1).toUpperCase()

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase()
    }
    return initials;
  }
}
