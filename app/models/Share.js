// @flow
import { Record, Map, Set } from 'immutable'
import Contact from './Contact'
import Profile from 'models/Profile'
import ShareRecipient from 'models/ShareRecipient'
import IpfsDirectory from 'models/IpfsDirectory'
import isIpfs from 'is-ipfs'

const LOCAL_DATA_VERSION = 1
const PUBLISH_DATA_VERSION = 1

export const ShareState = {
  AVAILABLE : 'AVAILABLE',
  DOWNLOADING : 'DOWNLOADING',
  PAUSED : 'PAUSED',
  SHARING : 'SHARING'
}
export type ShareStateType = $Keys<typeof ShareState>

/**
 * PlantUML diagram (http://plantuml.com/state-diagram)
 *
 * @startuml
 *
 * [*] --> Available : got a notification
 *
 * Available --> Downloading : start()
 * Downloading --> Available : abort()
 *
 * Downloading --> Paused : pause()
 * Paused --> Downloading : start()
 * Paused --> Sharing : download done
 *
 * Paused --> Available : abort()
 *
 * [*] --> Sharing : created a Share locally
 *
 * Downloading --> Sharing : download done
 * Sharing --> Available : data lost
 *
 * @enduml
 */

export const writable = {
  dataVersion: 'dataVersion',
  id: 'id',
  hash: 'hash',
  authorPubkey: 'authorPubkey',
  title: 'title',
  description: 'description',
  status: 'status',
  content: 'content',
  recipients: 'recipients',
  favorite: 'favorite',
  outputPath: 'outputPath'
}

export const ShareRecord = Record({
  dataVersion: LOCAL_DATA_VERSION,
  id: null,
  hash: null,
  authorPubkey: null,
  title: null,
  description: null,
  status: null,
  content: null,
  recipients: Map(),
  favorite: false,
  outputPath: null
}, 'Share')

export default class Share extends ShareRecord {
  dataVersion: number
  // local identifier
  id: number
  hash: ?string
  // (authorPubkey == null) mean that the user is the author
  authorPubkey: ?string
  title: string
  description: string
  status: ShareStateType
  content: ?IpfsDirectory
  recipients: Map<string,ShareRecipient>
  favorite: boolean
  outputPath: ?string

  static create(author: ?Contact, title: string, description: ?string = null) {
    return new this().withMutations(share => share
      .set(writable.authorPubkey, author ? author.pubkey : null)
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

    if(!isIpfs.multihash(hash)) {
      throw 'invalid hash'
    }

    const _recipients = Map(
      recipients.map(({pubkey}) => [pubkey, ShareRecipient.create(pubkey)])
    )

    return new this().withMutations(share => share
      .set(writable.hash, hash)
      .set(writable.status, ShareState.AVAILABLE)
      .set(writable.authorPubkey, author)
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
      author: this.isAuthor ? this.authorPubkey : profile.pubkey,
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

  get metadataLocal() : boolean {
    return this.content && this.content.metadataLocal
  }

  get isLocal() : boolean {
    return this.metadataLocal && this.content.isLocal
  }

  get isAuthor() : boolean {
    return this.authorPubkey === null
  }

  get isAvailable() : boolean {
    return this.status === ShareState.AVAILABLE
  }

  get isDownloading() : boolean {
    return this.status === ShareState.DOWNLOADING
  }

  get isPaused() : boolean {
    return this.status === ShareState.PAUSED
  }

  get isSharing() : boolean {
    return this.status === ShareState.SHARING
  }

  hasRecipient(pubkey: string) : boolean {
    return this.recipients.some((recipient: ShareRecipient) => recipient.pubkey === pubkey)
  }
}
