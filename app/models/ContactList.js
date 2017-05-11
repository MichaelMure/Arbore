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
  contacts: Map<string,Contact>

  // Find a contact by its public key
  findContact(pubkey: string) : ?Contact {
    return this.contacts.get(pubkey, null)
  }

  // Build a suggestion list with a string pattern
  suggestContact(pattern: string) : Array<Contact> {
    return this.contacts.filter((contact: Contact) => contact.match(pattern)).toArray()
  }
}
