// @flow
import { Record, List } from 'immutable'
import Contact from './Contact'
import ShareMetadata from './ShareMetadata'
import type { ObjectTypeType } from './IpfsObject'

import randomBool from '../utils/randomBool'

export const ShareState = {
  CREATING : 'CREATING', // adding objects
  READY : 'READY', // all metadata known
  WAITING_FOR_DL : 'WAITING_FOR_DL',
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
  author: null,
  metadata: null,
  status: ShareState.CREATING,
  content: List(),
  favorite: false
})

export default class Share extends ShareRecord {
  author: ?Contact
  metadata: ?ShareMetadata
  status: ShareState
  content: ?List<ObjectTypeType>
  favorite: boolean


  constructor(author: Contact, metadata: ShareMetadata) {
    super({author, metadata, favorite: randomBool()})
  }

  get progress() {
    // return this._progress
    return Math.floor(Math.random() * (101))
  }

}
