// @flow

export const ObjectType = {
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
  metadataProgress: []
}
