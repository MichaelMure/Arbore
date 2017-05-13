// @flow
import { createAction } from 'redux-actions'
import type { PageType } from 'models/UiState'

export const openProfile = createAction('UI_PROFILE_OPEN')
export const closeProfile = createAction('UI_PROFILE_CLOSE')
export const toggleProfile = createAction('UI_PROFILE_TOGGLE')

export const openNewShare = createAction('UI_NEWSHARE_OPEN')
export const closeNewShare = createAction('UI_NEWSHARE_CLOSE')
export const toggleNewShare = createAction('UI_NEWSHARE_TOGGLE')

export const closeAllDrawers = createAction('UI_CLOSE_DRAWERS')

export const setPage = createAction('UI_PAGE_SET',
  (page: PageType) => (page)
)

export const selectChatRoom = createAction('UI_CHATROOM_SELECT',
  (pubkey: string) => (pubkey)
)
