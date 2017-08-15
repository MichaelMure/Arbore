// @flow
import { Record, Map } from 'immutable'
import Identity from './Identity'
import { Theme } from 'models/Settings'
import type { ThemeType } from 'models/Settings'

/**
 * Used to store identities/accounts for the login screen
 * Identities are composed of a few properties of a full profile.
 */

export const LOCAL_DATA_VERSION = 1

export const writable = {
  identities: 'identities',
  selected: 'selected',
  theme: 'theme'
}

export const IdentityListRecord = Record({
  dataVersion: LOCAL_DATA_VERSION,
  identities: Map(),
  selected: null,
  theme: Theme.LIGHT
}, 'IdentityList')

export default class IdentityList extends IdentityListRecord {
  dataVersion: number
  identities: Map<string,Identity>
  // the redux storage key of the selected profile if any. This define if a user is logged in or not
  selected: ?string
  theme: ThemeType

  get isLogged(): boolean {
    return this.selected !== null
  }
}
