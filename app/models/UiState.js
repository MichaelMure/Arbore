// @flow

import { Record } from 'immutable'

export const keys = {
  profileOpen: 'profileOpen'
}

export const UiRecord = Record({
  [keys.profileOpen]: false,
})

export default class UiState extends UiRecord {
  profileOpen: boolean
}
