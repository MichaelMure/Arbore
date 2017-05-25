// @flow
import * as contact from 'actions/contact'
import * as contactList from 'actions/contactList'
import ContactList, { writable} from 'models/ContactList'
import { handleActions, combineActions } from 'redux-actions'
import type { Action } from 'utils/types'
import Contact from 'models/Contact'
import { Map } from 'immutable'
import contactReducer from './contact'
import { REHYDRATE } from 'redux-persist/constants'

let initialState = new ContactList()

// TODO: remove
import contactFxt from 'models/fixtures/contact'

if(process.env.NODE_ENV !== 'production') {
  contactFxt.forEach((contact) => {
    initialState = initialState.set(writable.contacts, initialState.contacts.set(contact.pubkey, contact))
  })
}

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

  [contactList.priv.addContact]: (state: ContactList, action: Action<Contact>) => {
    const contact: Contact = action.payload
    if(state.contacts.has(contact.pubkey)) {
      throw 'Contact already know'
    }
    return state.set(writable.contacts,
      state.contacts.set(action.payload.pubkey, action.payload)
    )
  },

  [contactList.setSelected]: (state: ContactList, action: Action<string>) => (
    state.set(writable.selectedPubkey, action.payload)
  ),

  [contactList.setSearch]: (state: ContactList, action: Action<string>) => (
    state.set(writable.search, action.payload)
  ),

  [combineActions(
    contact.updateContact,
    contact.setAvatar,
    contact.setPrivacy,
    contact.setPingToken,
    contact.pingResult,
    contact.addedAck,
  )] : (state: ContactList, action) => contactByPubkey(state, action)

}, initialState )

// Relay to the Contact reducer identified by
// the property 'pubkey' found in the action payload
function contactByPubkey(state: ContactList, action: Action) {
  const pubkey = action.payload.pubkey

  if(!state.contacts.has(pubkey)) {
    throw 'Unknow contact'
  }

  return state.update(writable.contacts,
    (contacts: Map) => contacts.update(pubkey,
        (contact: Contact) => contactReducer(contact, action)
    )
  )
}
