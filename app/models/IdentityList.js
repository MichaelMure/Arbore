// @flow
import { Record, Map } from 'immutable'
import Identity from './Identity'

/**
 * Used to store identities/accounts for the login screen
 * Identities are composed of a few properties of a full profile.
 */

export const LOCAL_DATA_VERSION = 1

export const writable = {
  identities: 'identities',
  selected: 'selected'
}

export const IdentityListRecord = Record({
  dataVersion: LOCAL_DATA_VERSION,
  identities: Map(),
  selected: null
}, 'IdentityList')

export default class IdentityList extends IdentityListRecord {
  dataVersion: number
  identities: Map<string,Identity>
  // the redux storage key of the selected profile if any. This define if a user is logged in or not
  selected: ?string

  get isLogged(): boolean {
    return this.selected !== null
  }
}
