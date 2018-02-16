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

  [chat.selectChatRoom]: (state: ChatRoomList, action: Action<string>) => (
    state.set(writable.selectedChat, action.payload)
  ),

  [combineActions(
    chat.priv.chatSent,
    chat.priv.chatReceived,
    chat.priv.chatAckReceived,
    chat.readAllRoom,
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
