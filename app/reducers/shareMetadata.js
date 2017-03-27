// @flow
import * as actions from '../actions/share';
import ShareMetadata, { writable } from '../models/ShareMetadata'
import { handleActions } from 'redux-actions'
import { Action } from '../utils/types'

const initialState = null

export default handleActions({

  [actions.setTitle]: (state: ShareMetadata, action: Action) => (
    state.set(writable.title, action.payload.title)
  ),

}, initialState )
