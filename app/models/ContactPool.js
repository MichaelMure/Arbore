// @flow
import { Record, Map, Set as immuSet } from 'immutable'
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
  rejected: immuSet(),
  follower: immuSet(),
}, 'ContactPool')

export default class ContactPool extends ContactPoolRecord {
  // store the contact list of potential contact as pubkey->list(pubkey)
  graph: Map<string, immuSet<string>>
  // store known potential contacts
  pool: Map<string, Contact>
  // store the rejected potential contact pubkey
  rejected: immuSet<string>
  // store contacts that had added the profile
  follower: immuSet<string>

  suggest(contactList: ContactList, number: number): Set<Contact> {
    const result = new Set()

    // TODO: do better

    this.graph.forEach((set: immuSet<string>) => {
      set.forEach((pubkey: string) => {
        if(contactList.contacts.has(pubkey)) {
          // continue
        }

        if(this.rejected.has(pubkey)) {
          // continue
        }

        if(this.pool.has(pubkey)) {
          result.add(this.pool.get(pubkey))
        }

        if(result.size >= number) {
          return result
        }
      })
    })
    return result
  }

  // return all the potentian contact's pubkey that don't have a full Contact in the pool
  get missingInPool(): Set<string> {
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

    return result
  }
}
