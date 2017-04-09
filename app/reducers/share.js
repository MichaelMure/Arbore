// @flow
import * as actions from '../actions/share';
import * as ipfs from '../actions/ipfs'
import Share, { writable } from '../models/Share'
import type { IpfsObject } from '../models/IpfsObject'
import { handleActions, combineActions } from 'redux-actions'
import { Action } from '../utils/types'
import metadataReducer from '../reducers/shareMetadata'
import ShareMetadata from "../models/ShareMetadata";
import EmptyIpfsObject from '../models/IpfsObject'
import ipfsObjectReducer from '../reducers/ipfsObject'

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

  [combineActions(
    ipfs.receivedFileMetadata,
    ipfs.receivedDirMetadata
  )] : (state: Share, action) => chainToObjects(state, action)

}, initialState )

function chainToObjects(state: Share, action: Action) {
  return state.set(writable.content,
    state.content.map(
      (child: IpfsObject) => ipfsObjectReducer(child, action)
    )
  )
}
