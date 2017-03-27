// @flow
import * as sharelist from '../actions/shareList';
import * as share from '../actions/share'
import ShareList, { writable } from '../models/ShareList'
import type { ShareListFilterType } from '../models/ShareList'
import Share from '../models/Share'
import { handleActions, combineActions } from 'redux-actions'
import { Action } from '../utils/types'
import shareReducer from './share'
import { List } from "immutable";

let initialState = new ShareList()

// TODO: remove !
import shareFxt from '../models/fixtures/share'
shareFxt.forEach((share) => {
  initialState = initialState.set(writable.list, initialState.list.push(share))
})


export default handleActions({

  [sharelist.add]: (state: ShareList, action: Action<Share>) => (
    state.set(writable.list, state.list.push(action.payload))
  ),

  [sharelist.setFilter]: (state: ShareList, action: Action<ShareListFilterType>) => (
    state.merge({
      [writable.filter]: action.payload,
      // reset the selected share if we actually change the filter
      [writable.selectedId]: (action.payload != state.filter ? null : state.selectedId)
    })
  ),

  [sharelist.setSelected]: (state: ShareList, action: Action<number>) => (
    state.set(writable.selectedId, action.payload)
  ),

  [combineActions(
    share.setTitle,
    share.toggleFavorite
  )] : (state: ShareList, action: Action) => (
    chainToShare(state, action)
  ),

}, initialState )

function chainToShare(state: ShareList, action: Action) {
  const id = action.payload.id
  return state.update(writable.list,
    (list: List) => list.update(
      list.findIndex((x: Share) => x.id == id),
      (share: Share) => shareReducer(share, action)
    )
  )
}
