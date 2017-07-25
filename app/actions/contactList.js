// @flow
import { createAction } from 'redux-actions'
import * as contactActions from 'actions/contact'
import * as chatActions from 'actions/chat'
import * as shareListActions from 'actions/shareList'
import type { Store } from 'utils/types'
import ContactList from 'models/ContactList'
import Contact from 'models/Contact'
import Profile from 'models/Profile'
import ChatRoomList from 'models/ChatRoomList'
import ShareList from 'models/ShareList'
import createProtocol from 'ipfs/createProtocol'
import { nextToken } from 'utils/tokenGenerator'

export const priv = {
  storeContactInDirectory: createAction('CONTACTLIST_CONTACT_STORE',
    (contact: Contact) => (contact)
  ),
  storeContactInPool: createAction('CONTACTPOOL_CONTACT_STORE',
    (contact: Contact) => ({contact})
  )
}

export const setSelected = createAction('CONTACTLIST_SELECTED_SET',
  (selectedPubkey: string) => (selectedPubkey)
)
export const setSearch = createAction('CONTACTLIST_SEARCH_SET',
  (search: string) => (search)
)
export const removeContact = createAction('CONTACTLIST_CONTACT_REMOVE',
  (contact: Contact) => (contact)
)
export const storeContactList = createAction('CONTACTPOOL_CONTACTLIST_STORE',
  (contact: Contact, list: Array<string>) => ({contact, list})
)
export const storeAddedAsContact = createAction('CONTACTPOOL_ADDEDASCONTACT',
  (pubkey: string) => ({pubkey})
)
export const rejectSuggestion = createAction('CONTACTPOOL_REJECTSUGGEST',
  (contact: Contact) => (contact)
)

// Fetch a contact profile and add it to the contact list
// Also perform various consequential tasks
export function addContactInDirectory(pubkey: string) {
  return async function (dispatch, getState) {
    const contactList: ContactList = getState().contactList

    if(getState().profile.pubkey===pubkey) {
      throw "Cannot add yourself!"
    }

    // Use a cached contact if available, otherwise fetch the profile
    const contact: Contact = contactList.pool.has(pubkey)
      ? contactList.pool.get(pubkey)
      : await dispatch(contactActions.fetchProfile(pubkey))

    await dispatch(priv.storeContactInDirectory(contact))

    // Ping the contact
    dispatch(pingContact(contact))

    // Inform the contact that we added him
    dispatch(addedAsContact(contact))

    // Ask for the contact list
    dispatch(queryContactList(contact))
  }
}

async function addContactInPool(pubkey: string) {
  return async function(dispatch, getState) {
    const contactList: ContactList = getState().contactList

    // don't do anything if the contact is already there
    if(contactList.pool.has(pubkey)) {
      return
    }

    const contact: Contact = await dispatch(contactActions.fetchProfile(pubkey))
    dispatch(priv.storeContactInPool(contact))
  }
}

// Fetch a contact's profile to update the local data
export function updateContact(pubkey: string) {
  return async function (dispatch) {
    const contact = await dispatch(contactActions.fetchProfile(pubkey))
    await dispatch(contactActions.updateContact(contact))
  }
}

// Update all the contacts
export function updateAllContacts() {
  return async function (dispatch, getState) {
    const state: Store = getState()
    const contactList: ContactList = state.contactList

    const result = await Promise.all(
      contactList.pool.map((contact: Contact) =>
        dispatch(updateContact(contact.pubkey))
          .then(() => [contact.pubkey, 'ok'])
          .catch(err => [contact.pubkey, err])
      )
    )

    console.log(result)
  }
}

// Fetch the contact for the pool if missing there
export function fetchContactIfMissing(pubkey: string) {
  return async function(dispatch, getState) {
    const state: Store = getState()
    const contactList: ContactList = state.contactList

    if(contactList.pool.has(pubkey)) {
      return
    }

    await dispatch(addContactInPool(pubkey))
  }
}

export function fetchAllMissingContacts() {
  return async function(dispatch, getState) {
    const state: Store = getState()
    const contactList: ContactList = state.contactList
    const chatRoomList : ChatRoomList = state.chatRoomList
    const shareList : ShareList = state.shareList

    const missing: Array<string> = contactList.missingInPool(chatRoomList, shareList)

    missing.forEach(async (pubkey: string) => (
      await dispatch(addContactInPool(pubkey))
    ))
  }
}

export function garbageCollectPool() {
  // TODO + scheduler
  // clean the contact pool for unused contact
}

/* Network messages */

const protocol = {
  queryContacts: createAction('CONTACTSQUERY',
    (profile: Profile) => ({from: profile.pubkey})
  ),
  contactsReply: createAction('CONTACTSREPLY',
    (profile: Profile, contacts: Array<string>) => ({from: profile.pubkey, contacts: contacts})
  ),
  ping: createAction('PING',
    (profile: Profile, token: string) => ({from: profile.pubkey, token: token})
  ),
  pong: createAction('PONG',
    (profile: Profile, token: string) => ({from: profile.pubkey, token: token})
  ),
  addedContactQuery: createAction('ADDEDCONTACTQUERY',
    (profile: Profile) => ({from: profile.pubkey})
  ),
  addedContactAck: createAction('ADDEDCONTACTACK',
    (profile: Profile) => ({from: profile.pubkey})
  )
}

let pubsub = null

export function subscribe() {
  return async function (dispatch, getState) {
    const profile: Profile = getState().profile

    pubsub = createProtocol('contactList', profile.contactsPubsubTopic, {
      [protocol.queryContacts.toString()]: handleQueryContacts,
      [protocol.contactsReply.toString()]: handleContactsReply,
      [protocol.ping.toString()]: handlePing,
      [protocol.pong.toString()]: handlePong,
      [protocol.addedContactQuery.toString()]: handleAddedContactQuery,
      [protocol.addedContactAck.toString()]: handleAddedContactAck,
    })

    await dispatch(pubsub.subscribe())
  }
}

export function unsubscribe() {
  return async function (dispatch) {
    await dispatch(pubsub.unsubscribe())
    pubsub = null
  }
}

export function queryContactList(contact: Contact) {
  return async function (dispatch, getState) {
    console.log('Query contact list of ' + contact.identity)
    const profile: Profile = getState().profile
    const data = protocol.queryContacts(profile)
    await dispatch(pubsub.send(contact.contactsPubsubTopic, data))
  }
}

export function queryAllContactsList() {
  return async function (dispatch, getState) {
    const state: Store = getState()
    const contactList: ContactList = state.contactList

    await Promise.all(
      contactList.directoryMapped.map((contact: Contact) => {
        dispatch(queryContactList(contact))
      })
    )
  }
}

function handleQueryContacts(dispatch, getState, payload) {
  const { from } = payload

  const contactList: ContactList = getState().contactList
  const contact = contactList.findContact(from)

  if(!contact) {
    console.log('Got a contactList query from unknow contact ' + from)
    return
  }

  const profile = getState().profile

  const data = protocol.contactsReply(profile, contactList.publicContacts)
  dispatch(pubsub.send(contact.contactsPubsubTopic, data))
}

function handleContactsReply(dispatch, getState, payload) {
  const { from, contacts } = payload

  const contactList: ContactList = getState().contactList
  const contact = contactList.findContact(from)

  if(!contact) {
    console.log('Got a contactList from unknow contact ' + from)
    return
  }

  // TODO: check contacts

  console.log('Got contact list from ' + contact.identity)

  dispatch(storeContactList(contact, contacts))
  dispatch(fetchAllMissingContacts())
}

export function pingContact(contact: Contact) {
  return async function (dispatch, getState) {
    console.log('Ping contact ' + contact.identity)
    const profile: Profile = getState().profile
    const token = nextToken()
    await dispatch(contactActions.setPingToken(contact.pubkey, token))
    const data = protocol.ping(profile, token)
    await dispatch(pubsub.send(contact.contactsPubsubTopic, data))
  }
}

export function pingAllContacts() {
  return async function (dispatch, getState) {
    const state: Store = getState()
    const contactList: ContactList = state.contactList

    await Promise.all(
      contactList.directoryMapped.map((contact: Contact) =>
        dispatch(pingContact(contact))
      )
    )
  }
}

function handlePing(dispatch, getState, payload) {
  const { from, token } = payload

  const contactList: ContactList = getState().contactList
  const contact = contactList.findContact(from)

  if(!contact) {
    console.log('Got a ping from unknow contact ' + from)
    return
  }

  console.log('Got a ping from ' + contact.identity)

  const profile: Profile = getState().profile
  const data = protocol.pong(profile, token)
  dispatch(pubsub.send(contact.contactsPubsubTopic, data))
}

function handlePong(dispatch, getState, payload) {
  const { from, token } = payload

  const contactList: ContactList = getState().contactList
  const contact = contactList.findContact(from)

  if(!contact) {
    console.log('Got a pong from unknow contact ' + from)
    return
  }

  if(contact.pingToken !== token) {
    console.log('Got a pong with a unknow token ' + token)
    return
  }

  console.log('Got a pong from ' + contact.identity)

  dispatch(contactActions.pingResult(contact.pubkey, true))

  // trigger actions to be done when we find that a contact is online
  dispatch(shareListActions.onContactPong(contact))
  dispatch(chatActions.onContactPong(contact))
}

export function addedAsContact(contact: Contact) {
  return async function (dispatch, getState) {
    console.log('Send added as contact to ' + contact.identity)

    const profile: Profile = getState().profile
    const data = protocol.addedContactQuery(profile)
    dispatch(pubsub.send(contact.contactsPubsubTopic, data))
  }
}

function handleAddedContactQuery(dispatch, getState, payload) {
  const { from } = payload

  console.log(from + ' added us as a contact')

  const profile: Profile = getState().profile

  dispatch(storeAddedAsContact(from))
  dispatch(fetchContactIfMissing(from))
  dispatch(pubsub.send(Contact.contactsPubsubTopic(from), protocol.addedContactAck(profile)))
}

function handleAddedContactAck(dispatch, getState, payload) {
  const { from } = payload

  const contactList: ContactList = getState().contactList
  const contact = contactList.findContact(from)

  if(!contact) {
    console.log('Got a added contact ack from unknow contact ' + from)
  }

  console.log(contact.identity + ' is aware we have added him as a contact')

  dispatch(contactActions.addedAck(from))
}
