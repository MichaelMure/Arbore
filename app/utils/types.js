// @flow

import Profile from '../models/Profile'
import ShareList from '../models/ShareList'
import UiState from '../models/UiState'

export type Action<T> = {
  type: string,
  payload: T,
  error: ?boolean
}

export type Store = {
  profile: Profile,
  shareList: ShareList,
  ui: UiState,
  routing: any
}
