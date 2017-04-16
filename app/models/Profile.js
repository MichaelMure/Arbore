// @flow
import { Record } from 'immutable'

export const writable = {
  avatarData: 'avatarData',
  avatarHash: 'avatarHash',
  identity: 'identity',
  bio: 'bio',
  hash: 'hash'
}

export const ProfileRecord = Record({
  avatarData: null,
  avatarHash: null,
  identity: '',
  bio: '',
  hash: null
}, 'Profile')

export default class Profile extends ProfileRecord {
  avatarData: ?string
  avatarHash: ?string
  identity: string
  bio: string
  hash: ?string

  static create(identity: string, bio: string) {
    return new this().withMutations(profile => profile
      .set(writable.identity, identity)
      .set(writable.bio, bio)
    )
  }
}
