// @flow
import * as actions from 'actions/settings';
import Settings, { writable } from 'models/Settings'
import type { ThemeType } from 'models/Settings'
import { handleActions } from 'redux-actions'
import { Action } from 'utils/types'

const initialState = new Settings()

export default handleActions({

  [actions.setTheme]: (state: Settings, action: Action<ThemeType>) => (
    state.set(writable.theme, action.payload)
  ),

  [actions.setDirectoryPrivacy]: (state: Settings, action: Action) => (
    state.set(writable.directoryPrivacy, action.payload)
  ),

  [actions.setAutoAddContactBack]: (state: Settings, action: Action) => (
    state.set(writable.autoAddContactBack, action.payload)
  ),

}, initialState )
