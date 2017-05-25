// @flow
import { Record, Map, Set } from 'immutable'
import Contact from './Contact'
import ContactList from 'models/ContactList'

export const writable = {
  graph: 'graph',
  pool: 'pool',
  rejected: 'rejected',
  follower: 'follower',
}

export const ContactPoolRecord = Record({
  graph: Map(),
  pool: Map(),
  rejected: Set(),
  follower: Set(),
}, 'ContactPool')

export default class ContactPool extends ContactPoolRecord {
  // store the contact list of potential contact as pubkey->list(pubkey)
  graph: Map<string, Set<string>>
  // store known potential contacts
  pool: Map<string, Contact>
  // store the rejected potential contact pubkey
  rejected: Set<string>
  // store contacts that had added the profile
  follower: Set<string>

  suggest(contactList: ContactList, number: number): Set<Contact> {
    return new Set()
  }
}
