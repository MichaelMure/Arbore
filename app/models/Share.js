// @flow
import Contact from "./Contact";
import ShareMetadata from "./ShareMetadata";

export const ShareState = {
  CREATING : 'CREATING', // adding objects
  READY : 'READY', // all metadata known
  WAITING_FOR_DL : 'WAITING_FOR_DL',
  DOWNLOADING : 'DOWNLOADING',
  PAUSED : 'PAUSED',
  SHARING : 'SHARING'
}

export default class Share {
  _author: Contact
  _metadata: ShareMetadata
  _status: ShareState

  constructor(author: Contact,
              metadata: ShareMetadata)
  {
    this._author = author
    this._metadata = metadata
    this._status = ShareState.READY
  }

  get author(): Contact {
    return this._author
  }

  get metadata(): ShareData {
    return this._metadata
  }

  get progress() {
    // return this._progress
    return Math.floor(Math.random() * (101))
  }

  get status(): ShareState {
    return this._status
  }
}
