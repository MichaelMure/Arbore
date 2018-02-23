// @flow
import { createAction } from 'redux-actions'
import UiState, { Page } from 'models/UiState'
import type { PageType } from 'models/UiState'
import type { Store } from 'utils/types'
import * as contactListActions from './contactList'
import * as chatActions from './chat'
import Contact from 'models/Contact'

export const openMenu = createAction('UI_MENU_OPEN')
export const closeMenu = createAction('UI_MENU_CLOSE')
export const toggleMenu = createAction('UI_MENU_TOGGLE')

export const openProfile = createAction('UI_PROFILE_OPEN')
export const closeProfile = createAction('UI_PROFILE_CLOSE')
export const toggleProfile = createAction('UI_PROFILE_TOGGLE')

export const openNewShare = createAction('UI_NEWSHARE_OPEN')
export const closeNewShare = createAction('UI_NEWSHARE_CLOSE')
export const toggleNewShare = createAction('UI_NEWSHARE_TOGGLE')

export const closeAllDrawers = createAction('UI_CLOSE_DRAWERS')

export const priv = {
  setPage: createAction('UI_PAGE_SET',
    (page: PageType) => (page)
  )
}

export function setPage(page: PageType) {
  return function(dispatch, getState) {
    const state: Store = getState()
    const ui: UiState = state.ui

    // detect when the page changed
    if(page !== ui.page) {
      switch(page) {
        case Page.CONTACT:
          if(!state.contactList.selected) {
            const firstContact : ?Contact = state.contactList.searched.first()
            if(firstContact) {
              dispatch(contactListActions.setSelected(firstContact.pubkey))
            }
          }
          break
        case Page.CHAT:
          if(!state.chatRoomList.selected) {
            const firstRoom : ?string = state.chatRoomList.rooms.keySeq().first()
            if(firstRoom) {
              dispatch(chatActions.selectChatRoom(firstRoom))
            }
          }
          break
        // for Page.SHARING, the same process is done in the shareList reducer
      }
    }


    dispatch(priv.setPage(page))
  }
}
