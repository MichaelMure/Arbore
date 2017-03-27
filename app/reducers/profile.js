// @flow
import * as profile from '../actions/profile';
import Profile, { writable} from '../models/Profile'
import { handleActions } from 'redux-actions'
import { Action } from '../utils/types'

const initialState = new Profile()

export default handleActions({

  [profile.update]: (state: Profile, action: Action) => (
    action.payload
  ),

  [profile.changeAvatar]: (state: Profile, action: Action) => (
    state.set(writable.avatar, action.payload)
  ),

}, initialState )
