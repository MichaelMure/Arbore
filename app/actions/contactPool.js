// @flow
import { createAction } from 'redux-actions'
import Contact from 'models/Contact'

export const storeContactList = createAction('CONTACTPOOL_STORE_CONTACTLIST',
  (contact: Contact, list: Array<string>) => ({contact, list})
)
export const addedAsContact = createAction('CONTACTPOOL_ADDEDASCONTACT',
  (pubkey: string) => ({pubkey})
)
