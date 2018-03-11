// @flow
import * as profile from 'actions/profile'
import Profile, { writable} from 'models/Profile'
import { handleActions } from 'redux-actions'
import { Action } from 'utils/types'

const initialState = null

export default handleActions({

  [profile.priv.storeNewProfile]: (state, action: Action<Profile>) => (
    action.payload
  ),

  [profile.priv.setProfileHash]: (state: Profile, action: Action<string>) => (
    state.set(writable.hash, action.payload)
  ),

  [profile.priv.setAvatarHash]: (state: Profile, action: Action<?string>) => (
    state
      .set(writable.avatarHash, action.payload)
      .set(writable.hash, null)
  ),

  [profile.priv.profilePublished]: (state: Profile, action: Action) => (
    state.set(writable.lastPublished, Date.now())
  ),

  [profile.setPassword]: (state: Profile, action: Action<?string>) => (
    state.set(writable.password, action.payload)
  ),

  [profile.setBio]: (state: Profile, action: Action<string>) => (
    state
      .set(writable.bio, action.payload)
      .set(writable.hash, null)
  ),

  [profile.deleteAvatar]: (state: Profile, action: Action) => (
    state
      .set(writable.avatarHash, null)
      .set(writable.hash, null)
  )

}, initialState )
