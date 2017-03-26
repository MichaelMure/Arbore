// @flow
import { ObjectType } from './IpfsObject'
import { Record } from 'immutable'

import randomHash from '../utils/randomHash'
import randomName from '../utils/randomName'

export const writable = {
  hash: 'hash',
  name: 'name',
  sizeTotal: 'sizeTotal',
  sizeLocal: 'sizeLocal',
  blockTotal: 'blockTotal',
  blockLocal: 'blockLocal',
  metadataLocal: 'metadataLocal',
}

const IpfsFileRecord = Record({
  // TODO: values for test only
  hash: randomHash(),
  name: randomName(),
  sizeTotal: 10000,
  sizeLocal: 5432,
  blockTotal: 15,
  blockLocal: 7,
  metadataLocal: false,
})

export default class IpfsFile extends IpfsFileRecord {
  hash: Buffer
  name: string
  sizeTotal: number
  sizeLocal: number
  blockTotal: number
  blockLocal: number
  metadataLocal: boolean

  get type(): ObjectType {
    return ObjectType.FILE
  }

  get fileTotal(): number {
    return 1;
  }

  get fileLocal(): number {
    return (this.blockTotal === this.blockLocal) ? 1 : 0;
  }
}

