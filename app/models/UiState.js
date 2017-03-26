// @flow

import { Record } from 'immutable'

export const writable = {
  profileOpen: 'profileOpen'
}

export const UiRecord = Record({
  profileOpen: false,
})

export default class UiState extends UiRecord {
  profileOpen: boolean
}
