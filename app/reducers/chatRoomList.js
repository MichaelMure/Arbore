// @flow
import * as chat from 'actions/chat'
import ChatRoomList, { writable} from 'models/ChatRoomList'
import ChatRoom from 'models/ChatRoom'
import Contact from 'models/Contact'
import { handleActions, combineActions } from 'redux-actions'
import { Action } from 'utils/types'
import chatRoomReducer from './chatRoom'

const initialState = new ChatRoomList()

export default handleActions({

  [chat.createRoom]: (state: ChatRoomList, action: Action<Contact>) => (
    state.set(writable.rooms,
      state.rooms.update(action.payload.pubkey,
        room => room ? room : new ChatRoom()
      )
    )
  ),

  [chat.priv.incrementMessageIndex]: (state: ChatRoomList, action) => (
    state.update(writable.messageIndex, index => index + 1)
  ),

  [combineActions(
    chat.priv.chatSent,
    chat.priv.chatReceived
  )] : (state: ChatRoomList, action) => roomByContact(state, action)

}, initialState )

// Relay to the chatRoom reducer identified by
// the property 'contact' found in the action payload
function roomByContact(state: ChatRoomList, action: Action) {
  const pubkey = action.payload.contact.pubkey
  return state.update(writable.rooms,
    rooms => rooms.update(pubkey,
      (room: ?ChatRoom) => chatRoomReducer(room, action)
    )
  )
}
