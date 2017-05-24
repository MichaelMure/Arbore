// @flow
import { Record, Map, List } from 'immutable'
import Contact from './Contact'

export const writable = {
  contacts: 'contacts',
  selectedPubkey: 'selectedPubkey',
  search: 'search',
}

export const ContactListRecord = Record({
  contacts: Map(),
  selectedPubkey: null,
  search: '',
}, 'ContactList')

export default class ContactList extends ContactListRecord {
  contacts: Map<string,Contact>
  // the contact's pubkey selected in the UI
  selectedPubkey: ?string
  // the current search pattern
  search: string

  // Find a contact by its public key
  findContact(pubkey: string) : ?Contact {
    return this.contacts.get(pubkey, null)
  }

  // Build a suggestion list with a string pattern
  suggestContact(pattern: string) : Array<Contact> {
    return this.contacts.filter((contact: Contact) => contact.match(pattern)).toArray()
  }

  get searched() : List<Contact> {
    if(this.search === '') {
      return this.contacts.valueSeq().toList()
    }

    return this.contacts.filter((contact: Contact) => (
      contact.match(this.search)
    )).valueSeq().toList()
  }

  // Return the selected contact, if any
  get selected() : ?Contact {
    return this.selectedPubkey ?
      this.findContact(this.selectedPubkey) :
      null
  }

  contactInSearched(pubkey: string) : boolean {
    return this.searched.some((contact: Contact) => contact.pubkey === pubkey)
  }

  get publicContacts(): Array<string> {
    return this.contacts
      .filter((contact: Contact) => !contact.privacyHidden)
      .valueSeq().map((contact: Contact) => contact.pubkey)
      .toArray()
  }
}
