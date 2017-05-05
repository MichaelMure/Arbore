// @flow
import * as profile from 'actions/profile'
import Profile, { writable} from 'models/Profile'
import { handleActions } from 'redux-actions'
import { Action } from 'utils/types'

const initialState = new Profile()

export default handleActions({

  [profile.priv.storeNewProfile]: (state: Profile, action: Action<Profile>) => (
    action.payload
  ),

  [profile.priv.setProfileHash]: (state: Profile, action: Action<string>) => (
    state.set(writable.hash, action.payload)
  ),

  [profile.priv.setAvatarHash]: (state: Profile, action: Action<?string>) => (
    state.set(writable.avatarHash, action.payload)
  ),

  [profile.priv.setPassphrase]: (state: Profile, action: Action<string>) => (
    state.set(writable.passphrase, action.payload)
  ),

  [profile.setBio]: (state: Profile, action: Action<string>) => (
    state.set(writable.bio, action.payload)
  ),

  [profile.deleteAvatar]: (state: Profile, action: Action) => (
    state.set(writable.avatarHash, null)
  )

}, initialState )
