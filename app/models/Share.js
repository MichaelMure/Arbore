// @flow
import { Record, Map } from 'immutable'
import Contact from './Contact'
import ShareMetadata from './ShareMetadata'
import type IpfsObject from './IpfsObject'

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
    // return this._progress
    return Math.floor(Math.random() * (101))
  }

  get metadataLocal() {
    return this.content.every(object => object.metadataLocal)
  }

}
