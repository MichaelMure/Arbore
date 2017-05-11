// @flow
import * as actions from 'actions/ui';
import UiState, { writable } from 'models/UiState'
import type { PageType } from 'models/UiState'
import { handleActions } from 'redux-actions'
import { Action } from 'utils/types'
import { REHYDRATE } from 'redux-persist/constants'

const initialState = new UiState()

export default handleActions({

  // Reset the state when the data come from the storage
  [REHYDRATE]: (state, action: Action) => (
    initialState
  ),

  [actions.openProfile]: (state: UiState, action: Action) => (
    state
      .set(writable.profileOpen, true)
      .set(writable.newShareOpen, false)
  ),
  [actions.closeProfile]: (state: UiState, action: Action) => (
    state.set(writable.profileOpen, false)
  ),
  [actions.toggleProfile]: (state: UiState, action: Action) => (
    state
      .set(writable.profileOpen, ! state.profileOpen)
      .set(writable.newShareOpen, false)
  ),

  [actions.openNewShare]: (state: UiState, action: Action) => (
    state
      .set(writable.newShareOpen, true)
      .set(writable.profileOpen, false)
  ),
  [actions.closeNewShare]: (state: UiState, action: Action) => (
    state.set(writable.newShareOpen, false)
  ),
  [actions.toggleNewShare]: (state: UiState, action: Action) => (
    state
      .set(writable.newShareOpen, ! state.newShareOpen)
      .set(writable.profileOpen, false)
  ),

  [actions.setPage]: (state: UiState, action: Action<PageType>) => (
    state.set(writable.page, action.payload)
  ),

  [actions.selectChatRoom]: (state: UiState, action: Action<string>) => (
    state.set(writable.selectedChat, action.payload)
  )

}, initialState )
