// @flow
import { handleActions } from 'redux-actions'
import { Action } from 'utils/types'
import * as ipfs from 'actions/ipfsObject'
import type { IpfsObject } from 'models/IpfsObject'
import { ObjectType } from 'models/IpfsObject'
import IpfsDirectory, { writable as dirWritable } from 'models/IpfsDirectory'
import IpfsFile, { writable as fileWritable } from 'models/IpfsFile'
import { Map } from 'immutable'

const reducer = handleActions({

  [ipfs.priv.receivedDirMetadata]: (state: IpfsDirectory, action: Action) => {
    const { links } = action.payload

    // Transform the links data
    const children: Map<string, IpfsObject> = new Map(links.map(
      ({Hash, Name, Size, Type}) => {
        switch (Type) {
          case 1: return [Name, IpfsDirectory.create(Hash)]
          case 2: return [Name, IpfsFile.create(Hash, Size)]
          default:
            throw `Unknow ipfs object type ${Type}`
        }
      }
    ))

    // Update the metadata
    return state.withMutations((state: IpfsDirectory) =>
      state.set(dirWritable.metadataLocal, true)
         .set(dirWritable.children, children)
    )
  },

  [ipfs.priv.isLocal]: (state: IpfsObject, action: Action) => {
    const {isLocal} = action.payload

    switch(state.type) {
      case ObjectType.FILE:
        // Set the file fully complete
        return state.set(fileWritable.sizeLocal, isLocal ? state.sizeTotal : 0)
      case ObjectType.DIRECTORY:
        // If isLocal, recursively call the reducer on children to set them all as local
        if(!isLocal) {
          return state
        }

        return state.set(dirWritable.children,
          state.children.update((children) => children.map((obj: IpfsObject) => reducer(obj, action)))
        )
    }
  }
}, null)

export default reducer
