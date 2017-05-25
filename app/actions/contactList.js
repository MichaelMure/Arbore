// @flow
import { createAction } from 'redux-actions'
import * as contactActions from 'actions/contact'
import * as contactPoolActions from 'actions/contactPool'
import type { Store } from 'utils/types'
import ContactList from 'models/ContactList'
import Contact from 'models/Contact'
import Profile from 'models/Profile'
import createProtocol from 'ipfs/createProtocol'
import { nextToken } from 'utils/tokenGenerator'

export const priv = {
  addContact: createAction('CONTACTLIST_CONTACT_ADD',
    (contact: Contact) => (contact)
  ),
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

const protocol = {
  queryList: createAction('LISTQUERY',
    (profile: Profile) => ({from: profile.pubkey})
  ),
  listReply: createAction('LISTREPLY',
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
      [protocol.queryList.toString()]: handleQueryList,
      [protocol.listReply.toString()]: handleListReply,
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

export function addContact(pubkey: string) {
  return async function (dispatch, getState) {
    const contact = await dispatch(contactActions.fetchProfile(pubkey))
    await dispatch(priv.addContact(contact))

    const profile: Profile = getState().profile
    const data = protocol.addedContactQuery(profile)
    dispatch(pubsub.send(contact.contactsPubsubTopic, data))
  }
}

export function updateContact(pubkey: string) {
  return async function (dispatch) {
    const contact = await dispatch(contactActions.fetchProfile(pubkey))
    await dispatch(contactActions.updateContact(contact))
  }
}

export function updateAllContacts() {
  return async function (dispatch, getState) {
    const state: Store = getState()
    const contactList: ContactList = state.contactList

    const result = await Promise.all(
      contactList.contacts.valueSeq().map((contact: Contact) =>
        dispatch(updateContact(contact.pubkey))
          .then(() => [contact.pubkey, 'ok'])
          .catch(err => [contact.pubkey, err])
      )
    )

    console.log(result)
  }
}

export function queryContactList(contact: Contact) {
  return async function (dispatch, getState) {
    console.log('Query contact list of ' + contact.identity)
    const profile: Profile = getState().profile
    const data = protocol.queryList(profile)
    await dispatch(pubsub.send(contact.contactsPubsubTopic, data))
  }
}

export function queryAllContactsList() {
  return async function (dispatch, getState) {
    const state: Store = getState()
    const contactList: ContactList = state.contactList

    await Promise.all(
      contactList.contacts.valueSeq().map((contact: Contact) => {
        dispatch(queryContactList(contact))
      })
    )
  }
}

function handleQueryList(dispatch, getState, payload) {
  const { from } = payload

  const contactList: ContactList = getState().contactList
  const contact = contactList.findContact(from)

  if(!contact) {
    console.log('Got a contactList query from unknow contact ' + from)
    return
  }

  const profile = getState().profile

  const data = protocol.listReply(profile, contactList.publicContacts)
  dispatch(pubsub.send(contact.contactsPubsubTopic, data))
}

function handleListReply(dispatch, getState, payload) {
  const { from, contacts } = payload

  const contactList: ContactList = getState().contactList
  const contact = contactList.findContact(from)

  if(!contact) {
    console.log('Got a contactList from unknow contact ' + from)
    return
  }

  // TODO: check contacts

  console.log('Got contact list from ' + contact.identity)

  dispatch(contactPoolActions.storeContactList(contact, contacts))
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
      contactList.contacts.valueSeq().map((contact: Contact) =>
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
}

function handleAddedContactQuery(dispatch, getState, payload) {
  const { from } = payload

  console.log(from + ' added us as a contact')

  const profile: Profile = getState().profile

  dispatch(contactPoolActions.addedAsContact(from))
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
