// @flow
import * as actions from '../actions/share';
import * as ipfs from '../actions/ipfs'
import Share, { writable, ShareState } from '../models/Share'
import type { IpfsObject } from '../models/IpfsObject'
import { handleActions, combineActions } from 'redux-actions'
import { Action } from '../utils/types'
import metadataReducer from '../reducers/shareMetadata'
import ShareMetadata from "../models/ShareMetadata";
import EmptyIpfsObject from '../models/IpfsObject'
import ipfsObjectReducer from '../reducers/ipfsObject'
import hashEquals from '../utils/hashEquals'
import { ObjectType } from '../models/IpfsObject'
import IpfsDirectory, { writable as dirWritable} from '../models/IpfsDirectory'

const initialState = null

export default handleActions({

  [actions.addEmptyObject]: (state: Share, action: Action<IpfsObject>) => {
    const { name, hash } = action.payload
    if(state.has(name)) {
      console.warn('ignored dupplicate content ${name} in share')
      return state
    }
    return state.set(writable.content, state.content.set(name, new EmptyIpfsObject(hash)))
  },

  [actions.toggleFavorite]: (state: Share, action: Action) => (
    state.update(writable.favorite, (x : boolean) => (!x))
  ),

  [actions.setTitle]: (state: Share, action: Action) => (
    state.update(writable.metadata, (x: ShareMetadata) => metadataReducer(x, action))
  ),

  [actions.setStarted]: (state: Share, action: Action) => (
    // TODO: better state machine
    state.update(writable.status, ShareState.DOWNLOADING)
  ),

  [combineActions(
    ipfs.receivedFileMetadata,
    ipfs.receivedDirMetadata
  )] : (state: Share, action) => chainToObjects(state, action)

}, initialState )

// Apply the IpfsObject reducer on all the childs Share content recursively
function chainToObjects(state: Share, action: Action) {
  return state.set(writable.content,
    state.content.map(
      (child: IpfsObject) => objectsDfsMutation(child, action)
    )
  )
}

// Perform a depth-first mutation on the IpfsObject graph with the IpfsObject reducer
// Note: this function does not detect if there is reused node in the DAG, so the reducer
// is applied multiple time in this case. For now this is not a problem as we represent
// those reused node as different object
function objectsDfsMutation(state: IpfsObject, action: Action) {
  const { hash } = action.payload

  // Check if we are concerned by the data
  if(!hashEquals(state.hash, hash)) {

    // Relay to child objects if any
    if(state.type === ObjectType.DIRECTORY) {
      return state.set(dirWritable.children,
        (state: IpfsDirectory).children.map(
          (child: IpfsObject) => objectsDfsMutation(child, action)
        )
      )
    }

    return state
  }

  // We found the good object, apply the reducer
  return ipfsObjectReducer(state, action)
}
