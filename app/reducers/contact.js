// @flow
import * as contact from 'actions/contact';
import { handleActions } from 'redux-actions'
import { Action } from 'utils/types'
import Contact, { writable } from 'models/Contact'

const initialState = null

export default handleActions({

  [contact.addContact]: (state, action: Action) => {
    const {pubkey, identity, bio, avatarHash} = action.payload
    return new Contact().withMutations(contact => contact
      .set(writable.pubkey, pubkey)
      .set(writable.identity, identity)
      .set(writable.bio, bio)
      .set(writable.avatarHash, avatarHash)
    )
  },

  [contact.setAvatar]: (state: Contact, action: Action) => {
    const {data} = action.payload
    return state.set(writable.avatarData, 'data:image/png;base64,' + data.toString('base64'))
  },

}, initialState )
