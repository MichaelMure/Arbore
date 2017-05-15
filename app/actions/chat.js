// @flow
import { createAction } from 'redux-actions'
import Contact from 'models/Contact'
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import { waitForIpfsReady } from 'ipfs/ipfsRenderer'
import { toDataBuffer, fromRawData, fromRawObject } from '@akashaproject/ipfs-connector/src/statics'
import ContactList from 'models/ContactList'
import Profile from 'models/Profile'

export const createRoom = createAction('CHAT_ROOM_CREATE',
  (contact: Contact) => (contact)
)

export const priv = {
  chatReceived: createAction('CHAT_MESSAGE_RECEIVED',
    (contact: Contact, message: string) => ({contact, message})
  ),
  chatSent: createAction('CHAT_MESSAGE_SENT',
    (contact: Contact, message: string) => ({contact, message})
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
    const {data /*, from, topicCIDs */} = event

    const { from, message } = JSON.parse(data.toString())

    const contactList: ContactList = getState().contactList
    const contact = contactList.findContact(from)

    if(!contact) {
      console.log('Received message from unknow contact ' + from)
      return
    }

    console.log('Received \'' + message + '\' from ' + contact.identity)
    dispatch(priv.chatReceived(contact, message))
  }
}

export function sendChat(contact: Contact, message: string) {
  return async function (dispatch, getState) {
    console.log('Sending \'' + message + '\' to ' + contact.identity)
    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    const profile: Profile = getState().profile

    await waitForIpfsReady()

    const data = {
      from: getState().profile.pubkey,
      message
    }

    const serialized = Buffer.from(JSON.stringify(data))

    await ipfs.api.apiClient.pubsub.publish(profile.chatPubsubTopic, serialized)

    return dispatch(priv.chatSent(contact, message))
  }
}
