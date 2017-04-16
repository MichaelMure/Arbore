// @flow
import { Record } from 'immutable'

export const writable = {
  name: 'name',
  avatar: 'avatar',
}

export const ContactRecord = Record({
  name: '',
  avatar: null
}, 'Contact')

export default class Contact extends ContactRecord {
  name: string
  avatar: ?string

  static create(name : string, avatar: string) : Contact {
    return new this().withMutations(contact => contact
      .set(writable.name, name)
      .set(writable.avatar, avatar)
    )
  }
}
