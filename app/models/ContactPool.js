// @flow
import { Record, Map, List } from 'immutable'
import Contact from './Contact'

export const writable = {
  graph: 'graph',
}

export const ContactPoolRecord = Record({
  graph: Map(),
}, 'ContactPool')

export default class ContactPool extends ContactPoolRecord {
  graph: Map<string, List<string>>
}
