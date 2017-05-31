// @flow
import * as contactPool from 'actions/contactPool'
import * as contactList from 'actions/contactList'
import ContactPool, { writable} from 'models/ContactPool'
import { handleActions } from 'redux-actions'
import type { Action } from 'utils/types'
import Contact from 'models/Contact'
import { Set } from 'immutable'

let initialState = new ContactPool()

// TODO: remove
import contactFxt from 'models/fixtures/contact'

if(process.env.NODE_ENV !== 'production') {
  contactFxt.forEach((contact) => {
    initialState = initialState.set(writable.pool, initialState.pool.set(contact.pubkey, contact))
  })
  let set = new Set()
  contactFxt.forEach((contact) => {
    set = set.add(contact.pubkey)
  })
  initialState = initialState.set(writable.graph, initialState.graph.set('pubkey567', set))
}

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

  [contactPool.rejectSuggestion]: (state: ContactPool, action: Action<Contact>) => {
    return state.set(writable.rejected, state.rejected.add(action.payload.pubkey))
  },

  [contactPool.priv.storeContactInPool]: (state: ContactPool, action: Action) => {
    const { contact } = action.payload
    return state.set(writable.pool, state.pool.set(contact.pubkey, contact))
  },

  // a manually removed contact is considered rejected from future suggestion
  [contactList.removeContact]: (state: ContactPool, action: Action) => {
    const { pubkey } = action.payload
    return state.set(writable.rejected, state.rejected.add(pubkey))
  },
}, initialState )
