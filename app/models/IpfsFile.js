// @flow
import IpfsObject, { ObjectType } from './IpfsObject'
import randomHash from '../utils/randomHash'
import randomName from '../utils/randomName'

export default class IpfsFile extends IpfsObject {
  _sizeTotal: number
  _sizeLocal: number
  _blockTotal: number
  _blockLocal: number
  _metadataLocal: boolean

  // For temporary test
  constructor() {
    // TODO: for test only
    super(randomHash(), randomName())
    this._sizeTotal = 10000;
    this._sizeLocal = 5432;
    this._blockTotal = 15;
    this._blockLocal = 7;
    this._metadataLocal = true;
  }

  get type(): ObjectType {
    return ObjectType.FILE
  }

  get sizeTotal(): number {
    return this._sizeTotal;
  }

  get sizeLocal(): number {
    return this._sizeLocal;
  }

  get blockTotal(): number {
    return this._blockTotal;
  }

  get blockLocal(): number {
    return this._blockLocal;
  }

  get fileTotal(): number {
    return 1;
  }

  get fileLocal(): number {
    return (blockTotal() === blockLocal()) ? 1 : 0;
  }

  get metadataLocal(): boolean {
    return this._metadataLocal;
  }
}
