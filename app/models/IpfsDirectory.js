// @flow
import { ObjectType } from './IpfsObject'
import type { IpfsObject, ObjectTypeType } from './IpfsObject'
import { Record, Map } from 'immutable'
import isIpfs from 'is-ipfs'

export const writable = {
  hash: 'hash',
  metadataLocal: '_metadataLocal',
  children: 'children',
}

export const IpfsDirectoryRecord = Record({
  hash: null,
  _metadataLocal: false,
  children: Map()
}, 'IpfsDirectory')

export default class IpfsDirectory extends IpfsDirectoryRecord {
  hash: string
  children: Map<string, IpfsObject>

  static create(hash: string) {
    if(!isIpfs.multihash(hash)) {
      throw 'invalid hash'
    }

    return new this()
      .set(writable.hash, hash)
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
