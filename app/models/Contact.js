// @flow
import { Record } from 'immutable'
import strContain from 'utils/strContain'
import { gatewayRoot } from 'ipfs/index'
import { PUBLISH_DATA_VERSION as PROFILE_VERSION } from 'models/Profile'

const LOCAL_DATA_VERSION = 1

export const ContactStatus = {
  OFFLINE:  'OFFLINE',
  ONLINE: 'ONLINE',
}
export type ContactStatusType = $Keys<typeof ContactStatus>

export const writable = {
  dataVersion: 'dataVersion',
  pubkey: 'pubkey',
  avatarHash: 'avatarHash',
  identity: 'identity',
  bio: 'bio',
  privacyHidden: 'privacyHidden',
  lastSeen: 'lastSeen',
  lastPing: 'lastPing',
  lastPongDelay: 'lastPongDelay',
  pingToken: 'pingToken',
  addedAck: 'addedAck'
}

export const ContactRecord = Record({
  dataVersion: LOCAL_DATA_VERSION,
  pubkey: null,
  avatarHash: null,
  identity: '',
  bio: '',
  privacyHidden: false,
  lastSeen: 0,
  lastPing: null,
  lastPongDelay: null,
  pingToken: null,
  addedAck: false,
}, 'Contact')

export default class Contact extends ContactRecord {
  dataVersion: number
  // Arbore ID, or stringified public key of the user
  pubkey: string
  // hash of the avatar file, if any
  avatarHash: ?string
  // Displayed name of the user
  identity: string
  bio: string
  privacyHidden: boolean
  // time when the contact was last known alive
  lastSeen: number
  // time when the last ping was sent
  lastPing: ?number
  // how long did it take for the contact to reply to a ping
  lastPongDelay: ?number
  // randon identifier of the last ping
  pingToken: ?string
  // does this contact is aware that we have added it ?
  addedAck: boolean

  static create(identity : string, bio: string, pubkey: string, avatarHash: ?string) : Contact {
    return new this().withMutations(contact => contact
      .set(writable.identity, identity)
      .set(writable.bio, bio)
      .set(writable.pubkey, pubkey)
      .set(writable.avatarHash, avatarHash)
    )
  }

  static fromProfileData(expectedPubkey: string, data) {
    const {dataVersion, identity, bio, pubkey, avatarHash} = data

    if(dataVersion !== PROFILE_VERSION) {
      throw 'Unexpected profile version'
    }

    if(expectedPubkey !== pubkey) {
      throw 'Received a different pubkey (' + pubkey + ') than expected (' + expectedPubkey + ')'
    }

    return new this().withMutations(contact => contact
      .set(writable.identity, identity)
      .set(writable.bio, bio)
      .set(writable.pubkey, pubkey)
      .set(writable.avatarHash, avatarHash)
    )
  }

  // Return true if the contact match the pattern
  match(pattern: string): boolean {
    return strContain(this.identity, pattern) || strContain(this.bio, pattern)
  }

  get avatarUrl(): ?string {
    return this.avatarHash ? gatewayRoot + this.avatarHash : null
  }

  get initials(): string {
    const names = this.identity.split(' ')
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }

  get status(): ContactStatusType {
    return (Date.now() - this.lastSeen < 5 * 60 * 1000) ?
      ContactStatus.ONLINE : ContactStatus.OFFLINE
  }

  get chatPubsubTopic(): string {
    return this.pubkey + '/chat'
  }

  get contactsPubsubTopic() : string {
    return this.pubkey + '/contacts'
  }

  static contactsPubsubTopic(pubkey: string) : string {
    return pubkey + '/contacts'
  }

  get sharesPubsubTopic() : string {
    return this.pubkey + '/shares'
  }

  static sharesPubsubTopic(pubkey: string) : string {
    return pubkey + '/shares'
  }
}
