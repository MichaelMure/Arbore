// @flow
import ContactList from 'models/ContactList'
import ContactPool from 'models/ContactPool'
import Profile from 'models/Profile'
import ShareList from 'models/ShareList'
import UiState from 'models/UiState'
import ChatRoomList from 'models/ChatRoomList'

export type Action<T> = {
  type: string,
  payload: T,
  error: ?boolean
}

export type Store = {
  chatRoomList: ChatRoomList,
  contactList: ContactList,
  contactPool: ContactPool,
  profile: Profile,
  shareList: ShareList,
  ui: UiState
}
