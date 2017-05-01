// @flow
import { createAction } from 'redux-actions'
import Identity from 'models/Identity'
import { changeStorePrefix, resetStorePrefix } from 'store';

export const createNewIdentity = createAction('IDENTITYLIST_IDENTITY_CREATE',
  (identity: Identity) => (identity)
)
export const selectIdenty = createAction('IDENTITYLIST_IDENTITY_SELECT',
  (identity: Identity) => (identity)
)
export const resetIdentity = createAction('IDENTITYLIST_IDENTITY_RESET')

/**
 * Login using the given identity and load the user data
 * @param identity
 * @returns {Promise}
 */
export function login(identity: Identity) {
  return function (dispatch) {
    // changeStorePrefix will flush the current profile on storage and load
    // the new one with the given prefix.
    // We still need to store the selected identity
    return changeStorePrefix(identity.pubkey)
      .then(() => dispatch(selectIdenty(identity)))
  }
}

/**
 * Logout, persist and unload the user data
 */
export function logout() {
  return function (dispatch) {
    resetStorePrefix()
    dispatch(resetIdentity())
  }
}
