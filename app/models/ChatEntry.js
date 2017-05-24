// @flow
import { Record } from 'immutable'

export const writable = {
  id: 'id',
  contactPubkey: 'contactPubkey',
  message: 'message',
  time: 'time',
  ack: 'ack',
}

export const ChatEntryRecord = Record({
  id: null,
  contactPubkey: null,
  message: null,
  time: null,
  ack: false,
}, 'ChatEntry')

export default class ChatEntry extends ChatEntryRecord {
  // a random identifier for the network
  id: string
  contactPubkey: ?string
  // the message itself
  message: string
  // time the message was either sent or received
  time: number
  // has the chat been ACKed (only valid for a message sent)
  ack: boolean

  static create(id: string, contactPubkey: ?string, message: string, time: number = Date.now()) : this {
    return new this().withMutations(entry => entry
      .set(writable.id, id)
      .set(writable.contactPubkey, contactPubkey)
      .set(writable.message, message)
      .set(writable.time, time)
    )
  }
}
