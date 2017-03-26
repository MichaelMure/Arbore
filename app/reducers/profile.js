// @flow
import * as actions from '../actions/profile';
import Profile, { writable} from '../models/Profile'
import { handleActions } from 'redux-actions'
import { Action } from '../utils/types'

const initialState = new Profile()

export default handleActions({

  [actions.update]: (state: Profile, action: Action) => (
    action.payload
  ),

  [actions.changeAvatar]: (state: Profile, action: Action) => (
    state.set(writable.avatar, action.payload)
  ),

}, initialState )
