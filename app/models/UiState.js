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
  page: 'page'
}

export const UiRecord = Record({
  profileOpen: false,
  page: Page.SHARING
})

export default class UiState extends UiRecord {
  profileOpen: boolean
  page: PageType
}
