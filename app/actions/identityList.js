// @flow
import { createAction } from 'redux-actions'
import Identity from 'models/Identity'
import { changeStorePrefix, resetStorePrefix } from 'store';

export const setIdenty = createAction('IDENTITYLIST_IDENTITY_SET',
  (identity: Identity) => (identity)
)

export const resetIdentity = createAction('IDENTITYLIST_IDENTITY_RESET')


export function login(identity: Identity) {
  return function (dispatch) {
    // changeStorePrefix will flush the current profile on storage and load
    // the new one with the given prefix.
    // We still need to store the selected identity
    changeStorePrefix(identity.pubkey)
      .then(() => dispatch(setIdenty(identity)))
  }
}

export function logout() {
  return function (dispatch) {
    resetStorePrefix()
    dispatch(resetIdentity())
  }
}
