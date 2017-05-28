// @flow
import { createAction } from 'redux-actions'
import Contact from 'models/Contact'
import ContactList from 'models/ContactList'
import Profile from 'models/Profile'
import type { Store } from 'utils/types'
import { mainWindowVisible } from 'utils/constants'
import createProtocol from 'ipfs/createProtocol'
import { nextToken } from 'utils/tokenGenerator'

/// #if isElectron
import { ipcRenderer } from 'electron'
/// #endif

export const createRoom = createAction('CHAT_ROOM_CREATE',
  (contact: Contact) => (contact)
)
export const readAllRoom = createAction('CHAT_ROOM_READALL',
  (contact: Contact) => ({contact})
)

export const priv = {
  chatReceived: createAction('CHAT_MESSAGE_RECEIVED',
    (contact: Contact, id: string, message: string) => ({contact, id, message})
  ),
  chatSent: createAction('CHAT_MESSAGE_SENT',
    (contact: Contact, id: string, message: string) => ({contact, id, message})
  ),
  chatAckReceived: createAction('CHAT_MESSAGE_ACK',
    (contact: Contact, id: string) => ({contact, id})
  ),
}

const protocol = {
  message: createAction('MESSAGE',
    (id: string, profile: Profile, message: string) => ({id, from: profile.pubkey, message})
  ),
  ack: createAction('ACK',
    (id: string, profile: Profile) => ({id, from: profile.pubkey})
  )
}

let pubsub = null

export function subscribe() {
  return async function (dispatch, getState) {

    const profile: Profile = getState().profile
    pubsub = createProtocol('chat', profile.chatPubsubTopic, {
      [protocol.message.toString()]: handleMessage,
      [protocol.ack.toString()]: handleAck,
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

function handleMessage(dispatch, getState, payload) {
  const {id, from, message} = payload

  const contactList: ContactList = getState().contactList
  const contact = contactList.findContact(from)

  if(!contact) {
    console.log('Received message from unknow contact ' + from)
    return
  }

  console.log('Received \'' + message + '\' from ' + contact.identity)
  dispatch(priv.chatReceived(contact, id, message))
  dispatch(sendChatAck(contact, id))

/// #if isElectron
  if(!ipcRenderer.sendSync(mainWindowVisible)) {
    new Notification(contact.identity, {
      icon: contact.avatarUrl,
      body: message
    })
  }
/// #endif
}

function handleAck(dispatch, getState, payload) {
  const {id, from} = payload

  const contactList: ContactList = getState().contactList
  const contact = contactList.findContact(from)

  if(!contact) {
    console.log('Received ACK from unknow contact ' + from)
    return
  }

  console.log('Received ACK with id ' + id + ' from ' + from)
  dispatch(priv.chatAckReceived(contact, id))
}

export function sendChat(contact: Contact, message: string) {
  return async function (dispatch, getState) {
    console.log('Sending \'' + message + '\' to ' + contact.identity)

    const state: Store = getState()
    const messageId = nextToken()

    const data = protocol.message(
      messageId,
      state.profile,
      message
    )

    await dispatch(priv.chatSent(contact, messageId, message))
    return dispatch(pubsub.send(contact.chatPubsubTopic, data))
  }
}

export function sendChatAck(contact: Contact, id: string) {
  return async function (dispatch, getState) {
    console.log('Sending message ACK ' + id + ' to ' + contact.identity)

    const state: Store = getState()
    const data = protocol.ack(id, state.profile)

    await dispatch(pubsub.send(contact.chatPubsubTopic, data))
  }
}
