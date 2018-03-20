// @flow
import { handleActions } from 'redux-actions'
import { Action } from 'utils/types'
import * as ipfs from 'actions/ipfsObject'
import type { IpfsObject } from 'models/IpfsObject'
import { ObjectType } from 'models/IpfsObject'
import IpfsDirectory, { writable as dirWritable } from 'models/IpfsDirectory'
import IpfsFile, { writable as fileWritable } from 'models/IpfsFile'
import { Map } from 'immutable'
import { priv } from 'actions/ipfsObject'

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
        if(state.sizeTotal !== 0 && sizeTotal !== 0 && sizeTotal !== state.sizeTotal) {
          console.warn("size mismatch, something is wrong")
        }

        return state
          .set(fileWritable.sizeLocal, isLocal ? state.sizeTotal : sizeLocal)
          .set(fileWritable.sizeTotal, state.sizeTotal > 0 ? state.sizeTotal : sizeTotal)

      case ObjectType.DIRECTORY:
        if(!isLocal) {
          return state
        }

        if(sizeLocal > 0) {
          // We don't have size information for children so we relay a new action without sizes
          action = priv.isLocal(action.payload.hash, true)
        }

        // If isLocal, recursively call the reducer on children to set them all as local
        return state.set(dirWritable.children,
          state.children.update((children) => children.map((obj: IpfsObject) => reducer(obj, action)))
        )
    }
  }
}, null)

export default reducer
