// @flow
import { Record, Map } from 'immutable'
import Contact from './Contact'

export const writable = {
  contacts: 'contacts',
}

export const ShareListRecord = Record({
  contacts: Map(),
}, 'ContactList')

export default class ContactList extends ShareListRecord {
  contacts: Map<Contact>

  // Find a contact by its public key
  findContact(pubkey: string) : Contact {

    // TODO: remove
    if(!this.contacts.has(pubkey)) {
      return Contact.create("Remy Sharp", "https://s3.amazonaws.com/uifaces/faces/twitter/rem/73.jpg", 'DZNJZDNKZN')
    }

    return this.contacts.get(pubkey)
  }
}
