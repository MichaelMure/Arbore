// @flow
import { Record } from 'immutable'

export const writable = {
  pubkey: 'pubkey',
  notified: 'notified',
}

export const ShareRecipientRecord = Record({
  pubkey: null,
  notified: false,
}, 'ShareRecipients')

export default class ShareRecipient extends ShareRecipientRecord {
  pubkey: string
  notified: boolean

  static create(pubkey: string) {
    return new this().set(writable.pubkey, pubkey)
  }
}
