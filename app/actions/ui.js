// @flow
import { createAction } from 'redux-actions'
import UiState, { Page } from 'models/UiState'
import type { PageType } from 'models/UiState'
import type { Store } from 'utils/types'
import * as contactListActions from './contactList'
import * as shareListActions from './shareList'
import Contact from 'models/Contact'
import Share from 'models/Share'

export const openProfile = createAction('UI_PROFILE_OPEN')
export const closeProfile = createAction('UI_PROFILE_CLOSE')
export const toggleProfile = createAction('UI_PROFILE_TOGGLE')

export const openNewShare = createAction('UI_NEWSHARE_OPEN')
export const closeNewShare = createAction('UI_NEWSHARE_CLOSE')
export const toggleNewShare = createAction('UI_NEWSHARE_TOGGLE')

export const closeAllDrawers = createAction('UI_CLOSE_DRAWERS')

export const selectChatRoom = createAction('UI_CHATROOM_SELECT',
  (pubkey: string) => (pubkey)
)

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
            dispatch(contactListActions.setSelected(firstContact.pubkey))
          }
          break
        // for Page.SHARING, the same process is done in the shareList reducer
      }
    }


    dispatch(priv.setPage(page))
  }
}
