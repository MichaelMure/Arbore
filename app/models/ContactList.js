// @flow
import { Record, List } from 'immutable'
import Contact from './Contact'

export const writable = {
  list: 'list',
}

export const ShareListRecord = Record({
  list: List(),
}, 'ContactList')

export default class ContactList extends ShareListRecord {
  list: List<Contact>
}
