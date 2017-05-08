// @flow
import * as chat from 'actions/chat'
import ChatRoom, {writable} from 'models/ChatRoom'
import ChatEntry from 'models/ChatEntry'
import Contact from 'models/Contact'
import { handleActions } from 'redux-actions'
import { Action } from 'utils/types'

const initialState = new ChatRoom()

export default handleActions({

  [chat.priv.chatReceived]: (state: ChatRoom, action: Action) => {
    const {contact, message} = action.payload
    return state.set(writable.history, state.history.push(
      ChatEntry.create(contact.pubkey, message)
    ))
  },

  [chat.priv.chatSent]: (state: ChatRoom, action: Action) => {
    const {message} = action.payload
    return state.set(writable.history, state.history.push(
      ChatEntry.create(null, message)
    ))
  },

}, initialState )
