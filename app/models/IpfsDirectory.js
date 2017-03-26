// @flow
import { ObjectType } from './IpfsObject'
import type IpfsObject from './IpfsObject'
import { Record, List } from 'immutable'

import randomHash from '../utils/randomHash'
import randomName from '../utils/randomName'

export const writable = {
  hash: 'hash',
  name: 'name',
  metadataLocal: '_metadataLocal',
}

const IpfsDirectoryRecord = Record({
  // TODO: values for test only
  hash: randomHash(),
  name: randomName(),
  _metadataLocal: false,
  _children: List()
})

export default class IpfsDirectory extends IpfsDirectoryRecord {
  hash: Buffer
  name: string

  get type(): ObjectType {
    return ObjectType.DIRECTORY
  }

  get children(): List<IpfsObject> {
    return this._children
  }

  get sizeTotal(): number {
    return this._children.reduce(
      (accu, child : IpfsObject) => accu + child.sizeTotal, 0
    );
  }

  get sizeLocal(): number {
    return this._children.reduce(
      (accu, child : IpfsObject) => accu + child.sizeLocal, 0
    );
  }

  get blockTotal(): number {
    return this._children.reduce(
      (accu, child : IpfsObject) => accu + child.blockTotal, 0
    );
  }

  get blockLocal(): number {
    return this._children.reduce(
      (accu, child : IpfsObject) => accu + child.blockLocal, 0
    );
  }

  get fileTotal(): number {
    return this._children.reduce(
      (accu, child : IpfsObject) => accu + child.fileTotal, 0
    );
  }

  get fileLocal(): number {
    return this._children.reduce(
      (accu, child : IpfsObject) => accu + child.fileLocal, 0
    );
  }

  get metadataLocal(): boolean {
    if(this._metadataLocal) {
      return false
    }

    return this._children.every(
      (child: IpfsObject) => child.metadataLocal
    )
  }
}
