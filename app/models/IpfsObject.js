// @flow
import { Record } from 'immutable'
import isIpfs from 'is-ipfs'

export const ObjectType = {
  INVALID : 'INVALID',
  RAW : 'RAW',
  DIRECTORY : 'DIRECTORY',
  FILE : 'FILE',
  METADATA : 'METADATA',
}
export type ObjectTypeType = $Keys<typeof ObjectType>

export type IpfsObject = {
  hash: string,
  type: ObjectTypeType,
  sizeTotal: number,
  sizeLocal: number,
  fileTotal: number,
  fileLocal: number,
  metadataLocal: boolean,
}

export const IpfsObjectRecord = Record({
  hash: null
}, 'EmptyIpfsObject')

// This object is used in the redux store to wait for metadata
export default class EmptyIpfsObject extends IpfsObjectRecord {

  static create(hash: string) {
    if(!isIpfs.multihash(hash)) {
      throw 'invalid hash'
    }

    return new this()
      .set('hash', hash)
  }

  get type(): ObjectTypeType {
    return ObjectType.INVALID
  }

  get metadataLocal() : boolean {
    return false
  }

  get sizeTotal() {
    return 0;
  }

  get sizeLocal() {
    return 0;
  }

  get fileTotal() {
    return 0;
  }

  get fileLocal() {
    return 0;
  }
}
