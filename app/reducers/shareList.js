// @flow
import * as sharelist from 'actions/shareList'
import * as share from 'actions/share'
import * as ipfs from 'actions/ipfsObject'
import ShareList, { ShareListFilter, writable } from 'models/ShareList'
import type { ShareListFilterType } from 'models/ShareList'
import Share from 'models/Share'
import { handleActions, combineActions } from 'redux-actions'
import type { Action } from 'utils/types'
import shareReducer from './share'
import { List } from 'immutable'
import { REHYDRATE } from 'redux-persist/constants'

let initialState = new ShareList()

export default handleActions({

  // Reset part of the state app re-launch
  [REHYDRATE]: (state, action: Action) => {
    const persisted = action.payload.shareList
    if(persisted) {
      return persisted.withMutations(sharelist => sharelist
        .set(writable.filter, ShareListFilter.AVAILABLE)
        .set(writable.selectedId, null)
        .set(writable.search, '')
      )
    }
    return persisted
  },

  [sharelist.priv.addShare]: (state: ShareList, action: Action<Share>) => {
    const share : Share = action.payload
    if(share.id === null) {
      throw 'Id shoud be set'
    }
    // Share already known
    if(state.list.some((stored: Share) => share.hash === stored.hash)) {
      return state
    }
    return state.set(writable.list, state.list.push(share))
  },

  [sharelist.setFilter]: (state: ShareList, action: Action<ShareListFilterType>) => (
    state.set(writable.filter, action.payload)
  ),

  [sharelist.setSelected]: (state: ShareList, action: Action<number>) => (
    state.set(writable.selectedId, action.payload)
  ),

  [sharelist.setSearch]: (state: ShareList, action: Action<string>) => (
    state.set(writable.search, action.payload)
  ),

  [combineActions(
    share.priv.setHash,
    share.priv.setOutputPath,
    share.priv.start,
    share.priv.pause,
    share.priv.abort,
    share.toggleFavorite,
    share.setRecipientNotified,
  )] : (state: ShareList, action: Action) => shareById(state, action),

  [combineActions(
    ipfs.priv.receivedDirMetadata,
    ipfs.priv.isLocal
  )] : (state: ShareList, action: Action) => allShares(state, action),

}, initialState )

// Relay to the Share reducer of a specific Share identified by
// the property 'id' found in the action payload
function shareById(state: ShareList, action: Action) {
  const id = action.payload.id
  return state.update(writable.list,
    (list: List) => list.update(
      list.findIndex((x: Share) => x.id === id),
      (share: Share) => shareReducer(share, action)
    )
  )
}

// Relay to the Share reducer of every child Share
function allShares(state: ShareList, action: Action) {
  return state.update(writable.list,
    (list: List) => list.map(
      (share: Share) => shareReducer(share, action)
    )
  )
}
