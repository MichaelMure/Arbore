// @flow
import * as actions from '../actions/ui';
import UiState, { writable } from '../models/UiState'
import { handleActions } from 'redux-actions'
import { Action } from '../utils/types'

const initialState = new UiState()

export default handleActions({

  [actions.openProfile]: (state: UiState, action: Action) => (
    state.set(writable.profileOpen, true)
  ),

  [actions.closeProfile]: (state: UiState, action: Action) => (
    state.set(writable.profileOpen, false)
  ),

  [actions.toggleProfile]: (state: UiState, action: Action) => (
    state.set(writable.profileOpen, ! state.profileOpen)
  ),

}, initialState )
