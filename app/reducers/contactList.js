// @flow
import * as contact from 'actions/contact'
import * as contactList from 'actions/contactList'
import ContactList, { writable} from 'models/ContactList'
import { handleActions, combineActions } from 'redux-actions'
import type { Action } from 'utils/types'
import Contact from 'models/Contact'
import { Map, Set } from 'immutable'
import contactReducer from './contact'
import { REHYDRATE } from 'redux-persist/constants'

let initialState = new ContactList()

export default handleActions({

  // Reset part of the state app re-launch
  [REHYDRATE]: (state, action: Action) => {
    const persisted = action.payload.contactList
    if(persisted) {
      return persisted.withMutations(contactlist => contactlist
        .set(writable.selectedPubkey, null)
        .set(writable.search, '')
      )
    }
    return persisted
  },

  [contactList.priv.storeContactInPool]: (state: ContactList, action: Action) => {
    const { contact } = action.payload
    return state.set(writable.pool, state.pool.set(contact.pubkey, contact))
  },

  [contactList.priv.storeContactInDirectory]: (state: ContactList, action: Action<Contact>) => {
    const contact: Contact = action.payload
    if(state.directory.has(contact.pubkey)) {
      throw 'Contact already know'
    }
    return state
      .set(writable.directory, state.directory.add(contact.pubkey))
      .set(writable.pool, state.pool.set(contact.pubkey, contact))
  },

  [contactList.removeContact]: (state: ContactList, action: Action<Contact>) => {
    const contact: Contact = action.payload
    if(!state.directory.has(contact.pubkey)) {
      throw 'Contact unknow'
    }
    return state
      .set(writable.directory, state.directory.remove(contact.pubkey))
      // a manually removed contact is considered rejected from future suggestion
      .set(writable.rejected, state.rejected.add(contact.pubkey))
      // unselect the contact if needed
      .set(writable.selectedPubkey, state.selectedPubkey === contact.pubkey ? null : state.selectedPubkey)
  },

  [contactList.setSelected]: (state: ContactList, action: Action<string>) => (
    state.set(writable.selectedPubkey, action.payload)
  ),

  [contactList.setSearch]: (state: ContactList, action: Action<string>) => (
    state.set(writable.search, action.payload)
  ),

  [contactList.storeContactList]: (state: ContactList, action: Action) => {
    const {contact, list} = action.payload
    return state.set(writable.graph,
      state.graph.set(contact.pubkey, Set(list))
    )
  },

  [contactList.storeAddedAsContact]: (state: ContactList, action: Action) => {
    const { pubkey } = action.payload
    return state.set(writable.follower, state.follower.add(pubkey))
  },

  [contactList.rejectSuggestion]: (state: ContactList, action: Action<Contact>) => {
    return state.set(writable.rejected, state.rejected.add(action.payload.pubkey))
  },


  [combineActions(
    contact.updateContact,
    contact.setAvatar,
    contact.setPrivacy,
    contact.setPingToken,
    contact.pingResult,
    contact.addedAck,
    contact.priv.isAlive,
  )] : (state: ContactList, action) => contactByPubkey(state, action)

}, initialState )

// Relay to the Contact reducer identified by
// the property 'pubkey' found in the action payload
function contactByPubkey(state: ContactList, action: Action) {
  const pubkey = action.payload.pubkey

  if(!state.pool.has(pubkey)) {
    throw 'Unknow contact'
  }

  return state.update(writable.pool,
    (contacts: Map) => contacts.update(pubkey,
        (contact: Contact) => contactReducer(contact, action)
    )
  )
}
