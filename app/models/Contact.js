// @flow
import { Record } from 'immutable'

export const writable = {
  name: 'name',
  avatar: 'avatar',
}

const ContactRecord = Record({
  name: '',
  avatar: null
})

export default class Contact extends ContactRecord {
  name: string
  avatar: ?string

  constructor(name : string, avatar: string) {
    super({name, avatar});
  }
}
