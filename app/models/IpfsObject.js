// @flow

export const ObjectType = {
  INVALID : 'INVALID',
  RAW : 'RAW',
  DIRECTORY : 'DIRECTORY',
  FILE : 'FILE',
  METADATA : 'METADATA',
}

export default class IpfsObject {
  _hash: Buffer
  _name: string

  constructor(hash: Buffer, name: string) {
    this._hash = hash
    this._name = name
  }

  get hash(): Buffer {
    return this._hash;
  }

  get name(): string {
    return this._name;
  }

  get type(): ObjectType {
    throw new TypeError('Implement this method in child classes')
  }

  get sizeTotal(): number {
        throw new TypeError('Implement this method in child classes')
  }

  get sizeLocal(): number {
        throw new TypeError('Implement this method in child classes')
  }

  get blockTotal(): number {
        throw new TypeError('Implement this method in child classes')
  }

  get blockLocal(): number {
        throw new TypeError('Implement this method in child classes')
  }

  get fileTotal(): number {
        throw new TypeError('Implement this method in child classes')
  }

  get fileLocal(): number {
        throw new TypeError('Implement this method in child classes')
  }

  get metadataLocal(): boolean {
    throw new TypeError('Implement this method in child classes')
  }
}

