// @flow
import { Record, Map } from 'immutable'
import ChatRoom from './ChatRoom'

export const writable = {
  rooms: 'rooms',
}

export const ChatRoomListRecord = Record({
  rooms: Map(),
}, 'ChatRoomList')

export default class ChatRoomList extends ChatRoomListRecord {
  rooms: Map<string, ChatRoom>

  findRoom(pubkey: string) {
    return this.rooms.get(pubkey)
  }
}
