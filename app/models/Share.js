// @flow
import { Record, Map, Set } from 'immutable'
import Contact from './Contact'
import ShareRecipient from 'models/ShareRecipient'
import type { IpfsObject } from './IpfsObject'
import Profile from 'models/Profile'

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
  author: null,
  title: null,
  description: null,
  status: null,
  content: Map(),
  recipients: Set(),
  favorite: false
}, 'Share')

export default class Share extends ShareRecord {
  dataVersion: number
  id: number
  author: ?Contact // (author == null) mean that the user is the author
  title: string
  description: string
  status: ShareStateType
  content: Map<string,IpfsObject>
  recipients: Set<ShareRecipient>
  favorite: boolean

  static create(author: ?Contact, title: string, description: ?string = null) {
    return new this().withMutations(share => share
      .set(writable.author, author)
      .set(writable.title, title)
      .set(writable.description, description)
      .set(writable.status, ShareState.AVAILABLE)
    )
  }

  // Return the object to be published in IPFS
  getPublishObject(profile: Profile): {} {
    const content = this.content.entrySeq().map(([name, object]) => ({
      name,
      hash: object.hash,
      type: object.type
    }))

    const recipients = this.recipients.valueSeq().map((recipient: ShareRecipient) => ({
      pubkey: recipient.pubkey
    }))

    return {
      dataVersion: PUBLISH_DATA_VERSION,
      author: this.author ? this.author.pubkey : profile.pubkey,
      title: this.title,
      description: this.description,
      content,
      recipients
    }
  }

  get progress() {
    if(this.content.count() === 0) {
      return 1
    }

    if(!this.metadataLocal) {
      return 0
    }

    const [sumLocal, sumTotal] = this.content
      .map((x: IpfsObject) => [x.sizeLocal, x.sizeTotal])
      .reduce((accu, [local, total]) => ([accu[0] + local, accu[1] + total]), [0,0])

    return sumLocal / sumTotal
  }

  get sizeTotal(): number {
    return this.content.reduce(
      (accu, child : IpfsObject) => accu + child.sizeTotal, 0
    );
  }

  get sizeLocal(): number {
    return this.content.reduce(
      (accu, child : IpfsObject) => accu + child.sizeLocal, 0
    );
  }

  get metadataLocal() {
    return this.content.every(object => object.metadataLocal)
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
}
