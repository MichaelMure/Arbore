// @flow
import { handleActions } from 'redux-actions'
import { Action } from 'utils/types'
import * as ipfs from 'actions/ipfsObject'
import type { IpfsObject } from 'models/IpfsObject'
import { ObjectType } from 'models/IpfsObject'
import IpfsDirectory, { writable as dirWritable} from 'models/IpfsDirectory'
import IpfsFile, { writable as fileWritable } from 'models/IpfsFile'
import EmptyIpfsObject from 'models/IpfsObject'
import { Map } from 'immutable'

const reducer = handleActions({

  [ipfs.receivedDirMetadata]: (state: IpfsObject, action: Action) => {
    const { links } = action.payload

    // If needed, replace the empty object by a real one now that we know what it is
    const dir: IpfsDirectory = ((state.type === ObjectType.INVALID) ?
      new IpfsDirectory(state.hash) :
      state)

    // Transform the links data
    const children: Map<string, IpfsObject> = new Map(links.map(
      ({Hash, Name}) => [Name, new EmptyIpfsObject(Hash)]
    ))

    // Update the metadata
    return dir.withMutations((dir: IpfsDirectory) =>
      dir.set(dirWritable.metadataLocal, true)
         .set(dirWritable.children, children)
    )
  },

  [ipfs.receivedFileMetadata]: (state: IpfsObject, action: Action) => {
    const { size } = action.payload

    // If needed, replace the empty object by a real one now that we know what it is
    const file: IpfsFile = state.type === ObjectType.INVALID ?
      new IpfsFile(state.hash) :
      state

    // Update the metadata
    // TODO: child block
    return file.withMutations((file: IpfsFile) =>
      file.set(fileWritable.sizeTotal, size))
          .set(fileWritable.metadataLocal, true)
  }
}, null)

export default reducer
