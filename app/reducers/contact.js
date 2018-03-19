// @flow
import * as contact from 'actions/contact';
import { handleActions } from 'redux-actions'
import { Action } from 'utils/types'
import Contact, { writable } from 'models/Contact'

const initialState = null

export default handleActions({

  [contact.updateContact]: (state: Contact, action: Action<Contact>) => {
    const contact: Contact = action.payload
    return state.withMutations(old => old
      .set(writable.bio, contact.bio)
      .set(writable.avatarHash, contact.avatarHash)
      .set(writable.peerID, contact.peerID)
    )
  },

  [contact.setAvatar]: (state: Contact, action: Action) => {
    return state.set(writable.avatarHash, action.payload.hash)
  },

  [contact.setPrivacy]: (state: Contact, action: Action) => {
    return state.set(writable.privacyHidden, action.payload.hidden)
  },

  [contact.setPingToken]: (state: Contact, action: Action) => {
    return state
      .set(writable.pingToken, action.payload.token)
      .set(writable.lastPing, Date.now())
  },

  [contact.pingResult]: (state: Contact, action: Action) => {
    // invalidate the ping token because we got an answer with it
    const newState = state.set(writable.pingToken, null)
    return action.payload.result
      ? newState.set(writable.lastSeen, Date.now()).set(writable.lastPongDelay, Date.now() - state.lastPing)
      : newState
  },

  [contact.addedAck]: (state: Contact, action: Action) => {
    return state.set(writable.addedAck, true)
  },
}, initialState )
