// @flow

export const ObjectType = {
  INVALID : 'INVALID',
  RAW : 'RAW',
  DIRECTORY : 'DIRECTORY',
  FILE : 'FILE',
  METADATA : 'METADATA',
}

export type IpfsObject = {
  hash: Buffer,
  name: string,
  type: ObjectType,
  sizeTotal: number,
  sizeLocal: number,
  blockTotal: number,
  blockLocal: number,
  fileTotal: number,
  fileLocal: number,
  metadataLocal: boolean,
}
