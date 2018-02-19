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
    const { links, isLocal } = action.payload

    // Transform the links data
    const children: Map<string, IpfsObject> = new Map(links.map(
      ({hash, name, size, type}) => {
        switch (type) {
          case 'dir': return [name, IpfsDirectory.create(hash)]
          case 'file': return [name, IpfsFile.create(hash, size, isLocal ? size : 0)]
          default:
            throw `Unknow ipfs object type ${type}`
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
    const {isLocal, sizeLocal, sizeTotal} = action.payload

    switch(state.type) {
      case ObjectType.FILE:
        if(isLocal) {
          return state
            .set(fileWritable.sizeLocal, sizeLocal)
            .set(fileWritable.sizeTotal, sizeTotal)
        } else {
          return state.set(fileWritable.sizeLocal, 0)
        }

      case ObjectType.DIRECTORY:
        if(!isLocal) {
          return state
        }

        // If isLocal, recursively call the reducer on children to set them all as local
        return state.set(dirWritable.children,
          state.children.update((children) => children.map((obj: IpfsObject) => reducer(obj, action)))
        )
    }
  }
}, null)

export default reducer
