// @flow
import { Record, Map } from 'immutable'
import ChatRoom from './ChatRoom'
import crypto from 'crypto'

export const writable = {
  rooms: 'rooms',
  messageIndex: 'messageIndex',
}

export const ChatRoomListRecord = Record({
  rooms: Map(),
  messageIndex: 0,
  secret: crypto.randomBytes(128).toString('hex')
}, 'ChatRoomList')

export default class ChatRoomList extends ChatRoomListRecord {
  rooms: Map<string, ChatRoom>

  findRoom(pubkey: string) {
    return this.rooms.get(pubkey)
  }

  get messageId(): string {
    const sha256 = crypto.createHash('sha256')
    return sha256.update(this.secret).update(super.messageIndex.toString()).digest('hex').slice(32)
  }
}
