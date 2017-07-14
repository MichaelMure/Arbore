// @flow
import { handleActions } from 'redux-actions'
import { Action } from 'utils/types'
import * as ipfs from 'actions/ipfsObject'
import type { IpfsObject } from 'models/IpfsObject'
import { ObjectType } from 'models/IpfsObject'
import IpfsDirectory, { writable as dirWritable} from 'models/IpfsDirectory'
import IpfsFile from 'models/IpfsFile'
import { Map } from 'immutable'

const reducer = handleActions({

  [ipfs.receivedDirMetadata]: (state: IpfsObject, action: Action) => {
    const { links } = action.payload

    // If needed, replace the empty object by a real one now that we know what it is
    const dir: IpfsDirectory = (state.type === ObjectType.INVALID)
      ? IpfsDirectory.create(state.hash)
      : state

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

    console.log(children)

    // Update the metadata
    return dir.withMutations((dir: IpfsDirectory) =>
      dir.set(dirWritable.metadataLocal, true)
         .set(dirWritable.children, children)
    )
  },
}, null)

export default reducer
