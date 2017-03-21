// @flow
import IpfsObject, { ObjectType } from './IpfsObject'
import randomHash from '../utils/randomHash'
import randomName from '../utils/randomName'

export default class IpfsDirectory extends IpfsObject {
  _children: Array<IpfsObject>
  _metadataLocal: boolean

  constructor() {
    // TODO: for test only
    super(randomHash(), randomName())
    this._children = []
    this._metadataLocal = false
  }

  get type(): ObjectType {
    return ObjectType.DIRECTORY
  }

  addChildren(obj: IpfsObject) {
    console.assert(
      this._children.every(
        (child: IpfsObject) => ! (child.hash.equals(obj.hash))
      )
    )
    this._children.push(obj)
  }

  get children(): Array<IpfsObject> {
    return this._children;
  }

  get sizeTotal(): number {
    return this._children.reduce(
      (accu, child : IpfsObject) => accu + child.sizeTotal, 0
    );
  }

  get sizeLocal(): number {
    return this._children.reduce(
      (accu, child : IpfsObject) => accu + child.sizeLocal, 0
    );
  }

  get blockTotal(): number {
    return this._children.reduce(
      (accu, child : IpfsObject) => accu + child.blockTotal, 0
    );
  }

  get blockLocal(): number {
    return this._children.reduce(
      (accu, child : IpfsObject) => accu + child.blockLocal, 0
    );
  }

  get fileTotal(): number {
    return this._children.reduce(
      (accu, child : IpfsObject) => accu + child.fileTotal, 0
    );
  }

  get fileLocal(): number {
    return this._children.reduce(
      (accu, child : IpfsObject) => accu + child.fileLocal, 0
    );
  }

  get metadataLocal(): boolean {
    if(this._metadataLocal) {
      return false
    }

    return this._children.every(
      (child: IpfsObject) => child.metadataLocal
    )
  }
}
