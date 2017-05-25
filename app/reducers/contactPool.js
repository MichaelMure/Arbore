// @flow
import * as contactPool from 'actions/contactPool'
import ContactPool, { writable} from 'models/ContactPool'
import { handleActions, combineActions } from 'redux-actions'
import type { Action } from 'utils/types'
import Contact from 'models/Contact'
import { List } from 'immutable'

let initialState = new ContactPool()

export default handleActions({

  [contactPool.storeContactList]: (state: ContactPool, action: Action) => {
    const {contact, list} = action.payload
    return state.set(writable.graph,
      state.graph.set(contact.pubkey, List.of(list))
    )
  },

  [contactPool.addedAsContact]: (state: ContactPool, action: Action) => {
    const { pubkey } = action.payload
    return state.set(writable.follower, state.follower.add(pubkey))
  },
}, initialState )
