// @flow

import { Record } from 'immutable'

export const keys = {
  avatar: 'avatar',
  identity: 'identity',
  bio: 'bio'
}

const ProfileRecord = Record({
  avatar: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
  identity: '',
  bio: ''
})

export default class Profile extends ProfileRecord {
  avatar: string
  identity: string
  bio: string
}
