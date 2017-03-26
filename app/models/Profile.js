// @flow
import { Record } from 'immutable'

export const writable = {
  avatar: 'avatar',
  identity: 'identity',
  bio: 'bio'
}

const ProfileRecord = Record({
  avatar: null,
  identity: '',
  bio: ''
})

export default class Profile extends ProfileRecord {
  avatar: ?string
  identity: string
  bio: string
}
