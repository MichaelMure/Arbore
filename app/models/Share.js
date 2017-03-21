// @flow
import Contact from "./Contact"
import ShareMetadata from "./ShareMetadata"
import IpfsObject from './IpfsObject'

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
  _content: Array<IpfsObject>

  constructor(author: Contact,
              metadata: ShareMetadata)
  {
    this._author = author
    this._metadata = metadata
    this._status = ShareState.READY
    this._content = []
  }

  get author(): Contact {
    return this._author
  }

  get metadata(): ShareMetadata {
    return this._metadata
  }

  get progress() {
    // return this._progress
    return Math.floor(Math.random() * (101))
  }

  get status(): ShareState {
    return this._status
  }

  get content(): Array<IpfsObject> {
    return this._content;
  }

  addObject(obj: IpfsObject) {
    console.assert(
      this._content.every(
        (child: IpfsObject) => ! (child.hash.equals(obj.hash))
      )
    )

    this._content.push(obj)
  }
}
