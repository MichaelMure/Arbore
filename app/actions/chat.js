// @flow
import { createAction } from 'redux-actions'
import Contact from 'models/Contact'
import ContactList from 'models/ContactList'
import ChatRoomList from 'models/ChatRoomList'
import ChatRoom from 'models/ChatRoom'
import ChatEntry from 'models/ChatEntry'
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
export const selectChatRoom = createAction('CHAT_ROOM_SELECT',
  (pubkey: string) => (pubkey)
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

// Execute anything needed when we find that a contact in online
//  - send message that are not ACKed
export function onContactAlive(contact: Contact) {
  return async function(dispatch, getState) {
    const state: Store = getState()
    const chatRoomList : ChatRoomList = state.chatRoomList
    const room : ?ChatRoom = chatRoomList.findRoom(contact.pubkey)

    if(!room) {
      return
    }

    // TODO:
    // - potentially send multiple time the same message when a contact is online (network overload for nothing)
    // - the message will be receive with an incorrect time

    // Stop on the first fail
    return await Promise.all(
      room.unAcknoledgedLastDay.map((entry: ChatEntry) => {
        const data = protocol.chat(
          entry.id,
          state.profile,
          entry.message
        )
        return dispatch(pubsub.send(contact.chatPubsubTopic, data))
      })
    )
  }
}

/* Network messages */

const protocol = {
  chat: createAction('CHAT',
    (id: string, profile: Profile, message: string) => ({id, from: profile.pubkey, message})
  ),
  chatAck: createAction('CHAT_ACK',
    (id: string, profile: Profile) => ({id, from: profile.pubkey})
  )
}

let pubsub = null

export function subscribe() {
  return async function (dispatch, getState) {

    const profile: Profile = getState().profile
    pubsub = createProtocol('chat', profile.chatPubsubTopic, {
      [protocol.chat.toString()]: handleMessage,
      [protocol.chatAck.toString()]: handleAck,
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
  const contact = contactList.findContactInDirectory(from)

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
  const contact = contactList.findContactInDirectory(from)

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

    const data = protocol.chat(
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
    const data = protocol.chatAck(id, state.profile)

    await dispatch(pubsub.send(contact.chatPubsubTopic, data))
  }
}
