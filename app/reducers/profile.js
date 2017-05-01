// @flow
import * as profile from 'actions/profile'
import Profile, { writable} from 'models/Profile'
import { handleActions } from 'redux-actions'
import { Action } from 'utils/types'

const initialState = new Profile()

export default handleActions({

  [profile.storeNewProfile]: (state: Profile, action: Action<Profile>) => (
    action.payload
  ),

  // [profile.changeAvatar]: (state: Profile, action: Action) => {
  //   const { hash, data } = action.payload
  //   return state.withMutations(state => state
  //     .set(writable.avatarData, 'data:image/png;base64,' + data.toString('base64'))
  //     .set(writable.avatarHash, hash)
  //   )
  // },

  [profile.setProfileHash]: (state: Profile, action: Action<string>) => (
    state.set(writable.hash, action.payload)
  ),

}, initialState )
