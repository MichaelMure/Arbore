// @flow

export const ObjectType = {
  INVALID : 'INVALID',
  RAW : 'RAW',
  DIRECTORY : 'DIRECTORY',
  FILE : 'FILE',
  METADATA : 'METADATA',
}
export type ObjectTypeType = $Keys<typeof ObjectType>

export type IpfsObject = {
  hash: Buffer,
  name: string,
  type: ObjectTypeType,
  sizeTotal: number,
  sizeLocal: number,
  blockTotal: number,
  blockLocal: number,
  fileTotal: number,
  fileLocal: number,
  metadataLocal: boolean,
}
