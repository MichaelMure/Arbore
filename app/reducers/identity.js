// @flow
import * as identity from 'actions/identity';
import { handleActions } from 'redux-actions'
import type { Action } from 'utils/types'
import Identity, { writable } from 'models/Identity'

const initialState = null

export default handleActions({

  [identity.createNewIdentity]: (state, action: Action<Identity>) => (
    action.payload
  ),

  [identity.setAvatarHash]: (state: Identity, action: Action) => (
    state.set(writable.avatarHash, action.payload.avatarHash)
  ),

  [identity.setHasPassword]: (state: Identity, action: Action) => (
    state.set(writable.hasPassword, action.payload.hasPassword)
  )

}, initialState )
