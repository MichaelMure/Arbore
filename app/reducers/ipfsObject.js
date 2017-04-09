// @flow
import { handleActions } from 'redux-actions'
import { Action } from '../utils/types'
import * as ipfs from '../actions/ipfs'
import type { IpfsObject } from '../models/IpfsObject'
import { ObjectType } from '../models/IpfsObject'
import IpfsDirectory, { writable as dirWritable} from '../models/IpfsDirectory'
import IpfsFile, { writable as fileWritable } from '../models/IpfsFile'
import EmptyIpfsObject from '../models/IpfsObject'
import { Map } from 'immutable'
import hashEquals from '../utils/hashEquals'


const reducer = handleActions({

  [ipfs.receivedDirMetadata]: (state: IpfsObject, action: Action) => {
    const { hash, links } = action.payload

    // Check if we are concerned by the data
    if(!hashEquals(state.hash, hash)) {

      // Relay to child objects if any
      if(state.type === ObjectType.DIRECTORY) {
        return state.set(dirWritable.children,
          state.children.map(
            (child: IpfsObject) => reducer(child, action)
          )
        )
      }

      return state
    }

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
    const {hash, size} = action.payload

    // Check if we are concerned by the data
    if(!hashEquals(state.hash, hash)) {

      // Relay to child objects if any
      if(state.type === ObjectType.DIRECTORY) {
        return state.set(dirWritable.children,
          state.children.map(
            (child: IpfsObject) => reducer(child, action)
          )
        )
      }

      return state
    }

    // If needed, replace the empty object by a real one now that we know what it is
    const file: IpfsFile = state.type === ObjectType.INVALID ?
      new IpfsFile(state.hash) :
      state

    // Update the metadata
    // TODO: child block + metadatalocal
    return file.withMutations((file: IpfsFile) =>
      file.set(fileWritable.sizeTotal, size))
          .set(fileWritable.metadataLocal, true)
  }
}, null)

export default reducer
