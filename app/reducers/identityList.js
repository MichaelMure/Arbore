// @flow
// import * as Identity from 'actions/Identity'
import IdentityList, { writable} from 'models/IdentityList'
import { handleActions, combineActions } from 'redux-actions'
import * as actions from 'actions/identityList'
import { Action } from 'utils/types'
import Identity from 'models/Identity'
import { Map } from 'immutable'
import { REHYDRATE } from 'redux-persist/constants'
// import IdentityReducer from './Identity'

let initialState = new IdentityList()

// TODO: remove
import identitiesFxt from 'models/fixtures/identities'
identitiesFxt.forEach((identity) => {
  initialState = initialState.set(writable.identities, initialState.identities.set(identity.pubkey, identity))
})

export default handleActions({

  // Reset part of the state app re-launch
  [REHYDRATE]: (state, action: Action) => {
    const persisted = action.payload.identityList
    if(persisted) {
      return persisted.set(writable.selected, null)
    }
    return persisted
  },

  [actions.setIdenty]: (state: IdentityList, action: Action<Identity>) => (
    state.set(writable.selected, action.payload.pubkey)
  ),

  [actions.resetIdentity]: (state: IdentityList, action: Action) => (
    state.set(writable.selected, null)
  ),
}, initialState )
