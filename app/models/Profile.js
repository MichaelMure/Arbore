// @flow

import { Record } from 'immutable'

export const keys = {
  avatar: 'avatar',
  identity: 'identity',
  bio: 'bio'
}

export const ProfileRecord = Record({
  [keys.avatar]: '',
  [keys.identity]: '',
  [keys.bio]: ''
})

export default class Profile extends ProfileRecord {
  avatar: string
  identity: string
  bio: string

  pwet() {
    return this.bio
  }
}
