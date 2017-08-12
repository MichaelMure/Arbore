// @flow
import { Record, Map, Set, List } from 'immutable'
import Contact from './Contact'
import ShareList from 'models/ShareList'
import ChatRoomList from 'models/ChatRoomList'
import Share from 'models/Share'

export const LOCAL_DATA_VERSION = 1

export const writable = {
  directory: 'directory',
  selectedPubkey: 'selectedPubkey',
  search: 'search',
  pool: 'pool',
  graph: 'graph',
  rejected: 'rejected',
  follower: 'follower',
}

export const ContactListRecord = Record({
  dataVersion: LOCAL_DATA_VERSION,
  directory: Set(),
  selectedPubkey: null,
  search: '',
  pool: Map(),
  graph: Map(),
  rejected: Set(),
  follower: Set(),
}, 'ContactList')

export default class ContactList extends ContactListRecord {
  dataVersion: number

  // the actual contact list of the user
  directory: Set<string>
  // the contact's pubkey selected in the UI
  selectedPubkey: ?string
  // the current search pattern
  search: string

  // store full Contact object for the other datastructures
  pool: Map<string, Contact>
  // store the contact list of potential contact as pubkey->list(pubkey)
  graph: Map<string, Set<string>>
  // store the rejected potential contact pubkey
  rejected: Set<string>
  // store contacts that had added the profile
  follower: Set<string>

  // Find a contact by its public key in the directory
  findContactInDirectory(pubkey: string) : ?Contact {
    return this.directory.has(pubkey) ? this.pool.get(pubkey, null) : null
  }

  // Find a contact by its public key in the Pool
  findContactInPool(pubkey: string) : ?Contact {
    return this.pool.get(pubkey, null)
  }

  get directoryMapped() {
    return this.directory.valueSeq()
      .map((pubkey: string) => this.findContactInDirectory(pubkey))
  }

  // Return a list of contacts that match the search pattern
  get searched() : List<Contact> {
    return this.directoryMapped
      .filter((contact: Contact) => (contact.match(this.search)))
      .toList()
  }

  // Return the selected contact, if any
  get selected() : ?Contact {
    return this.selectedPubkey
      ? this.findContactInPool(this.selectedPubkey)
      : null
  }

  // Return true if the given pubkey is present in the searched contacts
  contactInSearched(pubkey: string) : boolean {
    return this.searched.some((contact: Contact) => contact.pubkey === pubkey)
  }

  // Return true if the selected contact is present in the directory
  selectedInDirectory() : boolean {
    return this.selectedPubkey && this.directory.has(this.selectedPubkey)
  }

  // Build an autocomplete list with a string pattern
  autoComplete(pattern: string) : Array<Contact> {
    return this.directoryMapped
      .filter((contact: Contact) => contact.match(pattern))
      .toArray()
  }

  // Build a suggestion of new contact based on the known social graph
  suggestForAdd(number: number): Array<Contact> {
    const ratings = new global.Map()

    this.graph.forEach((set: Set<string>) => {
      set
      // filter out invalid candidates
        .filter((pubkey: string) => (
          !this.rejected.has(pubkey) && // already rejected
          !this.directory.has(pubkey) && // already added contact
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

  // return all the potential contact's pubkey that don't have a full Contact in the pool
  missingInPool(chatRoomList: ChatRoomList, shareList: ShareList): Array<string> {
    const result = new global.Set()

    this.follower.forEach((pubkey: string) => {
      if(!this.rejected.has(pubkey) && !this.pool.has(pubkey)) {
        result.add(pubkey)
      }
    })

    this.graph.forEach((set: Set<string>) => {
      set.forEach((pubkey: string) => {
        if(!this.rejected.has(pubkey) && !this.pool.has(pubkey)) {
          result.add(pubkey)
        }
      })
    })

    chatRoomList.rooms.keySeq().forEach((pubkey: string) => {
      if(!this.pool.has(pubkey)) {
        result.add(pubkey)
      }
    })

    shareList.list.forEach((share: Share) => {
      if(share.authorPubkey && !this.pool.has(share.authorPubkey)) {
        result.add(share.authorPubkey)
      }
      share.recipients.keySeq().forEach((pubkey: string) => {
        if(!this.pool.has(pubkey)) {
          result.add(pubkey)
        }
      })
    })

    return [...result]
  }

  // Return an array of pubkey that can be shared
  get publicContacts(): Array<string> {
    return this.directoryMapped
      .filter((contact: Contact) => !contact.privacyHidden)
      .valueSeq().map((contact: Contact) => contact.pubkey)
      .toArray()
  }
}
