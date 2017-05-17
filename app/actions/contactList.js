// @flow
import { createAction } from 'redux-actions'
import * as contactActions from 'actions/contact'
import type { Store } from 'utils/types'
import ContactList from 'models/ContactList'
import Contact from 'models/Contact'

export const addContact = createAction('CONTACTLIST_ADD',
  (contact: Contact) => (contact)
)
export const setSelected = createAction('CONTACTLIST_SELECTED_SET',
  (selectedPubkey: string) => (selectedPubkey)
)
export const setSearch = createAction('CONTACTLIST_SEARCH_SET',
  (search: string) => (search)
)

export function fetchContact(pubkey: string) {
  return async function (dispatch) {
    const contact = await dispatch(contactActions.fetchProfile(pubkey))
    await dispatch(addContact(contact))
  }
}

export function updateAllContacts() {
  return async function (dispatch, getState) {
    const state: Store = getState()
    const contactList: ContactList = state.contactList

    const result = await Promise.all(
      contactList.contacts.valueSeq().map((contact: Contact) =>
        dispatch(fetchContact(contact.pubkey))
          .then((result: Contact) => dispatch(addContact(result)))
          .then(() => [contact.pubkey, 'ok'])
          .catch(err => [contact.pubkey, err])
      )
    )

    console.log(result)
  }
}
