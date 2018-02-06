// @flow
import { Record } from 'immutable'
import { ObjectType } from './IpfsObject'
import type { ObjectTypeType } from './IpfsObject'
import isIpfs from 'is-ipfs'

export const writable = {
  hash: 'hash',
  sizeTotal: 'sizeTotal',
  sizeLocal: 'sizeLocal',
}

export const IpfsFileRecord = Record({
  hash: null,
  sizeTotal: 0,
  sizeLocal: 0,
}, 'IpfsFile')

export default class IpfsFile extends IpfsFileRecord {
  hash: string
  sizeTotal: number
  sizeLocal: number

  static create(hash: string, sizeTotal: number, sizeLocal: number = 0) {
    if(!isIpfs.multihash(hash)) {
      throw 'invalid hash'
    }

    return new this()
      .set(writable.hash, hash)
      .set(writable.sizeTotal, sizeTotal)
      .set(writable.sizeLocal, sizeLocal)
  }

  get type(): ObjectTypeType {
    return ObjectType.FILE
  }

  get metadataLocal() : boolean {
    return true
  }

  get fileTotal(): number {
    return 1;
  }

  get fileLocal(): number {
    return (this.sizeLocal === this.sizeTotal) ? 1 : 0;
  }
}

