// @flow

import Profile from '../models/Profile'
import UiState from '../models/UiState'

export type Action = {
  type: string,
  payload: any,
  error: ?boolean
}

export type Store = {
  profile: Profile,
  ui: UiState,
  routing: any
}
