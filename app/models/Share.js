// @flow
import { Record, Map, Set } from 'immutable'
import Contact from './Contact'
import Profile from 'models/Profile'
import ShareRecipient from 'models/ShareRecipient'
import { ObjectType } from 'models/IpfsObject'
import IpfsDirectory from 'models/IpfsDirectory'
import IpfsFile from 'models/IpfsFile'
import type { IpfsObject } from './IpfsObject'

const LOCAL_DATA_VERSION = 1
const PUBLISH_DATA_VERSION = 1

export const ShareState = {
  AVAILABLE : 'AVAILABLE',
  DOWNLOADING : 'DOWNLOADING',
  PAUSED : 'PAUSED',
  SHARING : 'SHARING'
}
export type ShareStateType = $Keys<typeof ShareState>

export const writable = {
  dataVersion: 'dataVersion',
  id: 'id',
  hash: 'hash',
  author: 'author',
  title: 'title',
  description: 'description',
  status: 'status',
  content: 'content',
  recipients: 'recipients',
  favorite: 'favorite'
}

export const ShareRecord = Record({
  dataVersion: LOCAL_DATA_VERSION,
  id: null,
  hash: null,
  author: null,
  title: null,
  description: null,
  status: null,
  content: null,
  recipients: Map(),
  favorite: false
}, 'Share')

export default class Share extends ShareRecord {
  dataVersion: number
  // local identifier
  id: number
  hash: ?string
  // (author == null) mean that the user is the author
  author: ?Contact
  title: string
  description: string
  status: ShareStateType
  content: ?IpfsDirectory
  recipients: Map<string,ShareRecipient>
  favorite: boolean

  static create(author: ?Contact, title: string, description: ?string = null) {
    return new this().withMutations(share => share
      .set(writable.author, author)
      .set(writable.title, title)
      .set(writable.description, description)
      .set(writable.status, ShareState.AVAILABLE)
    )
  }

  static fromData(hash: string, data) {
    const { dataVersion, author, title, description, content, recipients } = data

    if(dataVersion !== PUBLISH_DATA_VERSION) {
      throw 'Unexpected share data version'
    }

    const _recipients = Set(
      recipients.map(({pubkey}) => ShareRecipient.create(pubkey))
    )

    return new this().withMutations(share => share
      .set(writable.hash, hash)
      .set(writable.status, ShareState.AVAILABLE)
      .set(writable.author, author)
      .set(writable.title, title)
      .set(writable.description, description || '')
      .set(writable.content, IpfsDirectory.create(content))
      .set(writable.recipients, _recipients)
    )
  }

  // Return the object to be published in IPFS
  getPublishObject(profile: Profile): {} {
    const recipients = this.recipients.valueSeq().map((recipient: ShareRecipient) => ({
      pubkey: recipient.pubkey
    }))

    return {
      dataVersion: PUBLISH_DATA_VERSION,
      author: this.author ? this.author.pubkey : profile.pubkey,
      title: this.title,
      description: this.description,
      content: this.content.hash,
      recipients
    }
  }

  get progress(): number {
    return this.content.progress
  }

  get sizeTotal(): number {
    return this.content.sizeTotal
  }

  get sizeLocal(): number {
    return this.content.sizeLocal
  }

  get metadataLocal() {
    return this.content.metadataLocal
  }

  get isAuthor() {
    return this.author === null
  }

  get isAvailable() {
    return this.status === ShareState.AVAILABLE
  }

  get isDownloading() {
    return this.status === ShareState.DOWNLOADING
  }

  get isPaused() {
    return this.status === ShareState.PAUSED
  }

  get isSharing() {
    return this.status === ShareState.SHARING
  }

  hasRecipient(pubkey: string) : boolean {
    return this.recipients.some((recipient: ShareRecipient) => recipient.pubkey === pubkey)
  }
}
