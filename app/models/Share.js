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
  content: Map(),
  recipients: Set(),
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

  static fromData(hash: string, data) {
    const { dataVersion, author, title, description, content, recipients } = data

    if(dataVersion !== PUBLISH_DATA_VERSION) {
      throw 'Unexpected share data version'
    }

    const _content = Map(content.map(({name, hash, type}) => {
      switch(type) {
        case ObjectType.DIRECTORY: return [name, IpfsDirectory.create(hash)]
        case ObjectType.FILE:      return [name, IpfsFile.create(hash)]
        default: throw 'Unknow object type'
      }
    }))

    const _recipients = Set(
      recipients.map(({pubkey}) => ShareRecipient.create(pubkey))
    )

    return new this().withMutations(share => share
      .set(writable.hash, hash)
      .set(writable.status, ShareState.AVAILABLE)
      .set(writable.author, author)
      .set(writable.title, title)
      .set(writable.description, description)
      .set(writable.content, _content)
      .set(writable.recipients, _recipients)
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
