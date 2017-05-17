// @flow
import * as contact from 'actions/contact';
import { handleActions } from 'redux-actions'
import { Action } from 'utils/types'
import Contact, { writable } from 'models/Contact'

const initialState = null

export default handleActions({

  [contact.setAvatar]: (state: Contact, action: Action) => {
    return state.set(writable.avatarHash, action.payload.hash)
  },

  [contact.setPrivacy]: (state: Contact, action: Action) => {
    return state.set(writable.privacyHidden, action.payload.hidden)
  },
}, initialState )
