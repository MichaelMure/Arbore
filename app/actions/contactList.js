// @flow
import { createAction } from 'redux-actions'
import * as contactActions from 'actions/contact'
import type { Store } from 'utils/types'
import ContactList from 'models/ContactList'
import Contact from 'models/Contact'
import Profile from 'models/Profile'
import createProtocol from 'ipfs/createProtocol'
import { nextToken } from 'utils/tokenGenerator'

export const addContact = createAction('CONTACTLIST_ADD',
  (contact: Contact) => (contact)
)
export const setSelected = createAction('CONTACTLIST_SELECTED_SET',
  (selectedPubkey: string) => (selectedPubkey)
)
export const setSearch = createAction('CONTACTLIST_SEARCH_SET',
  (search: string) => (search)
)

const protocol = {
  queryList: createAction('QUERYLIST',
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

export function fetchContact(pubkey: string) {
  return async function (dispatch) {
    const contact = await dispatch(contactActions.fetchProfile(pubkey))
    await dispatch(addContact(contact))
  }
}

export function updateAllContacts() {
  return async function (dispatch, getState) {
    const state: Store = getState()
    const contactList: ContactList = state.contactList

    const result = await Promise.all(
      contactList.contacts.valueSeq().map((contact: Contact) =>
        dispatch(fetchContact(contact.pubkey))
          .then((result: Contact) => dispatch(addContact(result)))
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

  console.log(from, contacts)
}

export function pingContact(contact: Contact) {
  return async function (dispatch, getState) {
    console.log('Ping contact ' + contact.identity)
    const profile: Profile = getState().profile
    const data = protocol.ping(profile, nextToken())
    await dispatch(pubsub.send(contact.contactsPubsubTopic, data))
  }
}

export function pingAllContacts() {
  return async function (dispatch, getState) {
    const state: Store = getState()
    const contactList: ContactList = state.contactList

    const result = await Promise.all(
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
  }

  console.log('Got a pong from ' + contact.identity)

  dispatch(contactActions.pingResult(contact.pubkey, true))
}
