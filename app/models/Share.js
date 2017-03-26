// @flow
import { Record, List } from 'immutable'
import Contact from "./Contact"
import ShareMetadata from "./ShareMetadata"
import type IpfsObject from './IpfsObject'

export const ShareState = {
  CREATING : 'CREATING', // adding objects
  READY : 'READY', // all metadata known
  WAITING_FOR_DL : 'WAITING_FOR_DL',
  DOWNLOADING : 'DOWNLOADING',
  PAUSED : 'PAUSED',
  SHARING : 'SHARING'
}

export const writable = {
  author: 'author',
  metadata: 'metadata',
  status: 'status',
}

const ShareRecord = Record({
  author: null,
  metadata: null,
  status: ShareState.CREATING,
  content: List(),
})

export default class Share {
  author: ?Contact
  metadata: ?ShareMetadata
  status: ShareState
  content: ?List<IpfsObject>

  get progress() {
    // return this._progress
    return Math.floor(Math.random() * (101))
  }

}
