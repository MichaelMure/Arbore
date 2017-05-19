// @flow
import IdentityList, { writable} from 'models/IdentityList'
import { handleActions, combineActions } from 'redux-actions'
import * as actions from 'actions/identityList'
import * as identity from 'actions/identity'
import type { Action } from 'utils/types'
import Identity from 'models/Identity'
import { REHYDRATE } from 'redux-persist/constants'
import identityReducer from './identity'

let initialState = new IdentityList()

export default handleActions({

  // Reset part of the state app re-launch
  [REHYDRATE]: (state, action: Action) => {
    const persisted = action.payload.identityList
    if(persisted) {
      return persisted.set(writable.selected, null)
    }
    return persisted
  },

  [actions.priv.selectIdenty]: (state: IdentityList, action: Action<Identity>) => (
    state.set(writable.selected, action.payload.storageKey)
  ),

  [actions.priv.resetIdentity]: (state: IdentityList, action: Action) => (
    state.set(writable.selected, null)
  ),

  [combineActions(
    identity.createNewIdentity,
    identity.setAvatarHash
  )] : (state: IdentityList, action) => identityByStorageKey(state, action)
}, initialState )

// Relay to the Identity reducer identified by
// the property 'storageKey' found in the action payload
function identityByStorageKey(state: IdentityList, action: Action) {
  const storageKey = action.payload.storageKey
  return state.update(writable.identities,
    identities => identities.update(storageKey,
      (identity: ?Identity) => identityReducer(identity, action)
    )
  )
}
