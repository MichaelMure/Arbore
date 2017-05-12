// @flow
import { createAction } from 'redux-actions'
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
