// @flow
import { Record, Map } from 'immutable'
import Contact from './Contact'
import ShareMetadata from './ShareMetadata'
import type { IpfsObject } from './IpfsObject'

export const ShareState = {
  AUTHOR : 'AUTHOR',
  AVAILABLE : 'AVAILABLE',
  DOWNLOADING : 'DOWNLOADING',
  PAUSED : 'PAUSED',
  SHARING : 'SHARING'
}
export type ShareStateType = $Keys<typeof ShareState>

export const writable = {
  author: 'author',
  metadata: 'metadata',
  status: 'status',
  content: 'content',
  favorite: 'favorite'
}

const ShareRecord = Record({
  id: null,
  author: null,
  metadata: null,
  status: null,
  content: Map(),
  favorite: false
})

let idGenerator = 0

export default class Share extends ShareRecord {
  id: number
  author: ?Contact
  metadata: ?ShareMetadata
  status: ShareStateType
  content: Map<string,IpfsObject>
  favorite: boolean

  constructor(author: Contact, metadata: ShareMetadata) {
    super({id: idGenerator, author, metadata, status: ShareState.AVAILABLE})
    idGenerator++
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
    return this.status === ShareState.AUTHOR
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
