// @flow
import { Record, Map } from 'immutable'
import ChatRoom from './ChatRoom'

export const LOCAL_DATA_VERSION = 1

export const writable = {
  rooms: 'rooms',
}

export const ChatRoomListRecord = Record({
  dataVersion: LOCAL_DATA_VERSION,
  rooms: Map(),
}, 'ChatRoomList')

export default class ChatRoomList extends ChatRoomListRecord {
  dataVersion: number
  rooms: Map<string, ChatRoom>

  findRoom(pubkey: string) : ?ChatRoom {
    return this.rooms.get(pubkey)
  }
}
