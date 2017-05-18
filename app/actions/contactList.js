// @flow
import { createAction } from 'redux-actions'
import * as contactActions from 'actions/contact'
import type { Store } from 'utils/types'
import ContactList from 'models/ContactList'
import Contact from 'models/Contact'
import Profile from 'models/Profile'
import createProtocol from 'ipfs/createProtocol'

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
  )
}

let pubsub = null

export function subscribe() {
  return async function (dispatch, getState) {
    const profile: Profile = getState().profile

    pubsub = createProtocol('contactList', profile.contactsPubsubTopic, {
      [protocol.queryList.toString()]: handleQueryList,
      [protocol.listReply.toString()]: handleListReply,
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
    const profile: Profile = getState().profile
    const data = protocol.queryList(profile)
    await dispatch(pubsub.send(contact.contactsPubsubTopic, data))
  }
}
