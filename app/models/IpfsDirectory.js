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
    return this._metadataLocal && this.children.every(
      (child: IpfsObject) => child.metadataLocal
    )
  }

  get isLocal(): boolean {
    return this._metadataLocal && (this.fileLocal === this.fileTotal)
  }

  get progress() {
    if(!this.metadataLocal) {
      return 0
    }

    if(this.children.count() === 0) {
      return 1
    }

    const [sumLocal, sumTotal] = this.children.valueSeq()
      .map((x: IpfsObject) => [x.sizeLocal, x.sizeTotal])
      .reduce((accu, [local, total]) => ([accu[0] + local, accu[1] + total]), [0,0])

    return sumLocal / sumTotal
  }
}
