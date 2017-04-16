// @flow
import * as contact from '../actions/contact'
import ContactList, { writable} from '../models/ContactList'
import { handleActions, combineActions } from 'redux-actions'
import { Action } from '../utils/types'
import Contact from '../models/Contact'
import { List } from 'immutable'
import contactReducer from './contact'

const initialState = new ContactList()

export default handleActions({

  [contact.addContact]: (state: ContactList, action: Action) => (
    state.set(writable.list, state.list.push(
      contactReducer(contact, action)
    ))
  ),

  [combineActions(
    contact.setAvatar,
  )] : (state: ContactList, action) => contactByPubkey(state, action)

}, initialState )

// Relay to the Contact reducer identified by
// the property 'pubkey' found in the action payload
function contactByPubkey(state: ContactList, action: Action) {
  const pubkey = action.payload.pubkey
  return state.update(writable.list,
    (list: List) => list.update(
      list.findIndex((x: Contact) => x.pubkey === pubkey),
        (contact: Contact) => contactReducer(contact, action)
    )
  )
}
