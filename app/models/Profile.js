// @flow
import { Record } from 'immutable'

export const writable = {
  avatarData: 'avatarData',
  avatarHash: 'avatarHash',
  identity: 'identity',
  bio: 'bio',
  hash: 'hash'
}

const ProfileRecord = Record({
  avatarData: null,
  avatarHash: null,
  identity: '',
  bio: '',
  hash: null
})

export default class Profile extends ProfileRecord {
  avatarData: ?string
  avatarHash: ?string
  identity: string
  bio: string
  hash: ?string

  constructor(avatar: ?string, identity: string, bio: string) {
    super({avatar, identity, bio})
  }
}
