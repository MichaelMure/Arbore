// @flow
import { createAction } from 'redux-actions'
import Contact from 'models/Contact'
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import { waitForIpfsReady } from 'ipfs/ipfsRenderer'
import ContactList from 'models/ContactList'
import Profile from 'models/Profile'
import type { Store } from 'utils/types'
import { ipcRenderer } from 'electron'
import { mainWindowVisible } from 'utils/constants'

export const createRoom = createAction('CHAT_ROOM_CREATE',
  (contact: Contact) => (contact)
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
  incrementMessageIndex: createAction('CHAT_INDEX_INCR'),
}

const protocol = {
  message: createAction('MESSAGE',
    (id: string, profile: Profile, message: string) => ({id, from: profile.pubkey, message})
  ),
  ack: createAction('ACK',
    (id: string, profile: Profile) => ({id, from: profile.pubkey})
  )
}

let chatHandler = null

export function subscribeToChats() {
  return async function (dispatch, getState) {
    console.log('Subscribe to chats ...')
    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    await waitForIpfsReady()

    chatHandler = createChatHandler(dispatch, getState)

    const profile: Profile = getState().profile
    return await ipfs.api.apiClient.pubsub.subscribe(profile.chatPubsubTopic, {}, chatHandler)
  }
}

export function unsubscribeFromChats(profile: Profile) {
  return async function (dispatch) {
    console.log('Unsubscribe from chats ...')
    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    await waitForIpfsReady()

    return await ipfs.api.apiClient.pubsub.unsubscribe(profile.chatPubsubTopic, chatHandler)
  }
}

function createChatHandler(dispatch, getState) {
  return function (event) {
    const {data, from, /* topicCIDs */} = event

    const action = JSON.parse(data.toString())

    switch (action.type) {
      case protocol.message.toString(): handleMessage(dispatch, getState, action.payload); break
      case protocol.ack.toString(): handleAck(dispatch, getState, action.payload); break
      default:
        throw 'Received corrupted chat action from ' + from
    }
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

  if(!ipcRenderer.sendSync(mainWindowVisible)) {
    new Notification(contact.identity, {
      icon: contact.avatarUrl,
      body: message
    })
  }
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
    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    await waitForIpfsReady()

    // TODO: potential bug here with two concurent increment ending with the same message index
    dispatch(priv.incrementMessageIndex())
    const state: Store = getState()
    const messageId = state.chatRoomList.messageId

    const data = protocol.message(
      messageId,
      state.profile,
      message
    )

    const serialized = Buffer.from(JSON.stringify(data))

    await ipfs.api.apiClient.pubsub.publish(contact.chatPubsubTopic, serialized)

    return dispatch(priv.chatSent(contact, messageId, message))
  }
}

export function sendChatAck(contact: Contact, id: string) {
  return async function (dispatch, getState) {
    console.log('Sending message ACK ' + id + ' to ' + contact.identity)
    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    await waitForIpfsReady()

    const state: Store = getState()

    const data = protocol.ack(id, state.profile)

    const serialized = Buffer.from(JSON.stringify(data))

    await ipfs.api.apiClient.pubsub.publish(contact.chatPubsubTopic, serialized)
  }
}
