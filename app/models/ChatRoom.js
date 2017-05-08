// @flow
import { Record, List } from 'immutable'
import ChatEntry from './ChatEntry'

export const writable = {
  history: 'history',
  lastRead: 'lastRead'
}

export const ChatRoomRecord = Record({
  history: List(),
  lastRead: -1
}, 'ChatRoom')

export default class ChatRoom extends ChatRoomRecord {
  history: List<ChatEntry>

  get unread(): number {
    return this.history.count() - this.lastRead
  }
}
