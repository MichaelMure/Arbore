// @flow
import { ObjectType } from './IpfsObject'
import type { IpfsObject, ObjectTypeType } from './IpfsObject'
import { Record, Map } from 'immutable'

export const writable = {
  hash: 'hash',
  metadataLocal: '_metadataLocal',
  children: 'children',
}

const IpfsDirectoryRecord = Record({
  hash: null,
  _metadataLocal: false,
  children: Map()
})

export default class IpfsDirectory extends IpfsDirectoryRecord {
  hash: string
  children: Map<string, IpfsObject>

  constructor(hash: string) {
    super({hash})
  }

  get type(): ObjectTypeType {
    return ObjectType.DIRECTORY
  }

  get sizeTotal(): number {
    return this.children.reduce(
      (accu, child : IpfsObject) => accu + child.sizeTotal, 0
    );
  }

  get sizeLocal(): number {
    return this.children.reduce(
      (accu, child : IpfsObject) => accu + child.sizeLocal, 0
    );
  }

  get blockTotal(): number {
    return this.children.reduce(
      (accu, child : IpfsObject) => accu + child.blockTotal, 0
    );
  }

  get blockLocal(): number {
    return this.children.reduce(
      (accu, child : IpfsObject) => accu + child.blockLocal, 0
    );
  }

  get fileTotal(): number {
    return this.children.reduce(
      (accu, child : IpfsObject) => accu + child.fileTotal, 0
    );
  }

  get fileLocal(): number {
    return this.children.reduce(
      (accu, child : IpfsObject) => accu + child.fileLocal, 0
    );
  }

  get metadataLocal(): boolean {
    if(! this._metadataLocal) {
      return false
    }

    return this.children.every(
      (child: IpfsObject) => child.metadataLocal
    )
  }
}
