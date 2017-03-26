// @flow
import { ObjectType } from './IpfsObject'
import type IpfsObject from './IpfsObject'
import { Record } from 'immutable'

import randomHash from '../utils/randomHash'
import randomName from '../utils/randomName'

export const keys = {
  hash: '_hash',
  name: '_name',
  sizeTotal: '_sizeTotal',
  sizeLocal: '_sizeLocal',
  blockTotal: '_blockTotal',
  blockLocal: '_blockLocal',
  metadataLocal: '_metadataLocal',
}

const IpfsFileRecord = Record({
  // TODO: values for test only
  _hash: randomHash(),
  _name: randomName(),
  _sizeTotal: 10000,
  _sizeLocal: 5432,
  _blockTotal: 15,
  _blockLocal: 7,
  _metadataLocal: true,
})

export default class IpfsFile extends IpfsFileRecord {

  get hash(): Buffer {
    return this._hash
  }

  get name(): string {
    return this._name
  }

  get type(): ObjectType {
    return ObjectType.FILE
  }

  get fileTotal(): number {
    return 1;
  }

  get fileLocal(): number {
    return (this._blockTotal === this._blockLocal) ? 1 : 0;
  }

  get sizeTotal(): number {
    return this._sizeTotal
  }
  get sizeLocal(): number {
    return this._sizeLocal
  }

  get blockTotal(): number {
    return this._blockTotal
  }

  get blockLocal(): number {
    return this._blockLocal
  }

  get metadataLocal(): boolean {
    return this._metadataLocal
  }
}

