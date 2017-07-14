// @flow
import * as actions from 'actions/share'
import * as ipfs from 'actions/ipfsObject'
import Share, { writable } from 'models/Share'
import IpfsDirectory, { writable as dirWritable } from 'models/IpfsDirectory'
import ShareRecipient, { writable as recipientWritable } from 'models/ShareRecipient'
import type { IpfsObject } from 'models/IpfsObject'
import { handleActions, combineActions } from 'redux-actions'
import { Action } from 'utils/types'
import ipfsObjectReducer from 'reducers/ipfsObject'
import hashEquals from 'utils/hashEquals'
import { ObjectType } from 'models/IpfsObject'

const initialState = null

export default handleActions({

  [actions.toggleFavorite]: (state: Share, action: Action) => (
    state.update(writable.favorite, (x : boolean) => (!x))
  ),

  [actions.setRecipientNotified]: (state: Share, action: Action) => (
    state.updateIn([writable.recipients,  action.payload.pubkey],
      (recipients: ShareRecipient) => recipients.set(recipientWritable.notified, true)
  )),

  [actions.priv.setHash]: (state: Share, action: Action) => (
    state.set(writable.hash, action.payload.hash)
  ),

  [combineActions(
    ipfs.receivedDirMetadata
  )] : (state: Share, action) => chainToObjects(state, action)

}, initialState )

// Apply the IpfsObject reducer on all the childs Share content recursively
function chainToObjects(state: Share, action: Action) {
  if(!state.content) {
    return state
  }

  return state.set(writable.content, objectsDfsMutation(state.content, action))
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
