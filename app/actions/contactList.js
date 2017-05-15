// @flow
import { createAction } from 'redux-actions'
import * as contactActions from 'actions/contact'

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
