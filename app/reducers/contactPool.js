// @flow
import * as contactPool from 'actions/contactPool'
import * as contactList from 'actions/contactList'
import ContactPool, { writable} from 'models/ContactPool'
import { handleActions } from 'redux-actions'
import type { Action } from 'utils/types'
import Contact from 'models/Contact'
import { Set } from 'immutable'

let initialState = new ContactPool()

export default handleActions({

  [contactPool.storeContactList]: (state: ContactPool, action: Action) => {
    const {contact, list} = action.payload
    return state.set(writable.graph,
      state.graph.set(contact.pubkey, Set(list))
    )
  },

  [contactPool.addedAsContact]: (state: ContactPool, action: Action) => {
    const { pubkey } = action.payload
    return state.set(writable.follower, state.follower.add(pubkey))
  },

  // a manually removed contact is considered rejected from future suggestion
  [contactList.removeContact]: (state: ContactPool, action: Action) => {
    const { pubkey } = action.payload
    return state.set(writable.rejected, state.rejected.add(pubkey))
  },
}, initialState )
