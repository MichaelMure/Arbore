// @flow
import { Record } from 'immutable'
import { ObjectType } from './IpfsObject'
import type { ObjectTypeType } from './IpfsObject'

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
  hash: null,
  name: null,
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

  // TODO: remove
  constructor() {
    super({hash: randomHash(), name: randomName()})
  }

  get type(): ObjectTypeType {
    return ObjectType.FILE
  }

  get fileTotal(): number {
    return 1;
  }

  get fileLocal(): number {
    return (this.blockTotal === this.blockLocal) ? 1 : 0;
  }
}

