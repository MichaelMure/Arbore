// @flow
import { Record, Map } from 'immutable'
import ChatRoom from './ChatRoom'

export const LOCAL_DATA_VERSION = 1

export const writable = {
  rooms: 'rooms',
  selectedChat: 'selectedChat',
}

export const ChatRoomListRecord = Record({
  dataVersion: LOCAL_DATA_VERSION,
  rooms: Map(),
  selectedChat: null,
}, 'ChatRoomList')

export default class ChatRoomList extends ChatRoomListRecord {
  dataVersion: number
  rooms: Map<string, ChatRoom>
  selectedChat: string

  findRoom(pubkey: string) : ?ChatRoom {
    return this.rooms.get(pubkey)
  }

  // Return the selected room if any
  get selected() : ?ChatRoom {
    return this.selectedChat
      ? this.findRoom(this.selectedChat)
      : null
  }

  get unread(): number {
    return this.rooms.reduce(
      (accu, room : ChatRoom) => accu + room.unread, 0
    )
  }
}
