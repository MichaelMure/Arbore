// @flow
import { Record, Map as immuMap, Set as immuSet } from 'immutable'
import Contact from './Contact'
import ContactList from 'models/ContactList'

export const writable = {
  graph: 'graph',
  pool: 'pool',
  rejected: 'rejected',
  follower: 'follower',
}

export const ContactPoolRecord = Record({
  graph: immuMap(),
  pool: immuMap(),
  rejected: immuSet(),
  follower: immuSet(),
}, 'ContactPool')

export default class ContactPool extends ContactPoolRecord {
  // store the contact list of potential contact as pubkey->list(pubkey)
  graph: immuMap<string, immuSet<string>>
  // store known potential contacts
  pool: immuMap<string, Contact>
  // store the rejected potential contact pubkey
  rejected: immuSet<string>
  // store contacts that had added the profile
  follower: immuSet<string>

  // Find a contact by its public key
  findContact(pubkey: string) : ?Contact {
    return this.pool.get(pubkey, null)
  }

  suggest(contactList: ContactList, number: number): Array<Contact> {
    const ratings: Map<string, number> = new Map()

    this.graph.forEach((set: immuSet<string>) => {
      set
        // filter out invalid candidates
        .filter((pubkey: string) => (
          !this.rejected.has(pubkey) && // already rejected
          !contactList.contacts.has(pubkey) && // already added contact
          this.pool.has(pubkey) // not available in the pool
        ))
        // compute a rating
        .forEach((pubkey: string) => {
          ratings.set(pubkey, 1)
        })
    })

    // sort the rating by descending order and map to the pubkeys
    const candidates = [...ratings.keys()]
    candidates.sort((a,b) => ratings.get(b) - ratings.get(a))

    // map to the *number* best contacts
    return candidates
      .slice(0, number)
      .map((pubkey: string) => this.pool.get(pubkey))
  }

  // return all the potentian contact's pubkey that don't have a full Contact in the pool
  get missingInPool(): Array<string> {
    const result = new Set()

    this.follower.forEach((pubkey: string) => {
      if(!this.rejected.has(pubkey) && !this.pool.has(pubkey)) {
        result.add(pubkey)
      }
    })

    this.graph.forEach((set: immuSet<string>) => {
      set.forEach((pubkey: string) => {
        if(!this.rejected.has(pubkey) && !this.pool.has(pubkey)) {
          result.add(pubkey)
        }
      })
    })

    return Array.from(result.values())
  }
}
