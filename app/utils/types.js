// @flow
import ChatRoomList from 'models/ChatRoomList'
import ContactList from 'models/ContactList'
import ContactPool from 'models/ContactPool'
import GlobalError from 'models/GlobalError'
import Profile from 'models/Profile'
import ShareList from 'models/ShareList'
import UiState from 'models/UiState'

export type Action<T> = {
  type: string,
  payload: T,
  error: ?boolean
}

export type Store = {
  chatRoomList: ChatRoomList,
  contactList: ContactList,
  contactPool: ContactPool,
  globalError: ?GlobalError,
  profile: Profile,
  shareList: ShareList,
  ui: UiState
}
