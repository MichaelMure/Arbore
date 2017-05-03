// @flow
import IdentityList, { writable} from 'models/IdentityList'
import { handleActions } from 'redux-actions'
import * as actions from 'actions/identityList'
import type { Action } from 'utils/types'
import Identity from 'models/Identity'
import { REHYDRATE } from 'redux-persist/constants'

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

  [actions.createNewIdentity]: (state: IdentityList, action: Action<Identity>) => {
    const identity: Identity = action.payload
    return state.set(writable.identities, state.identities.set(identity.pubkey, identity))
  },

  [actions.selectIdenty]: (state: IdentityList, action: Action<Identity>) => (
    state.set(writable.selected, action.payload.pubkey)
  ),

  [actions.resetIdentity]: (state: IdentityList, action: Action) => (
    state.set(writable.selected, null)
  ),
}, initialState )
