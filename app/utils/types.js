// @flow
import ContactList from '../models/ContactList'
import Profile from '../models/Profile'
import ShareList from '../models/ShareList'
import UiState from '../models/UiState'

export type Action<T> = {
  type: string,
  payload: T,
  error: ?boolean
}

export type Store = {
  contactList: ContactList,
  profile: Profile,
  shareList: ShareList,
  ui: UiState
}
