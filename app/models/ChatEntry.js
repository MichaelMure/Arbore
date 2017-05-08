// @flow
import { Record } from 'immutable'

export const writable = {
  contactPubkey: 'contactPubkey',
  message: 'message',
  time: 'time',
}

export const ChatEntryRecord = Record({
  contactPubkey: null,
  message: null,
  time: null
}, 'ChatEntry')

export default class ChatEntry extends ChatEntryRecord {
  contactPubkey: ?string
  message: string
  time: number

  static create(contactPubkey: ?string, message: string, time: number = Date.now()) : this {
    return new this().withMutations(entry => entry
      .set(writable.contactPubkey, contactPubkey)
      .set(writable.message, message)
      .set(writable.time, time)
    )
  }
}
