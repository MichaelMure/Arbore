// @flow

import { Record } from 'immutable'

export const Page = {
  SHARING: 'SHARING',
  CHAT: 'CHAT',
  CONTACT: 'CONTACT',
}
export type PageType = $Keys<typeof Page>

export const writable = {
  profileOpen: 'profileOpen',
  newShareOpen: 'newShareOpen',
  page: 'page',
  selectedChat: 'selectedChat',
}

export const UiRecord = Record({
  profileOpen: false,
  newShareOpen: false,
  page: Page.SHARING,
  selectedChat: null,
}, 'UiState')

export default class UiState extends UiRecord {
  profileOpen: boolean
  newShareOpen: boolean
  page: PageType
  selectedChat: string
}
