// @flow
import * as shareActions from 'actions/share'
import * as sharelistActions from 'actions/shareList'
import * as ipfsObjectActions from 'actions/ipfsObject'
import * as uiActions from 'actions/ui'
import type { Store } from 'utils/types'
import Share, { ShareState } from 'models/Share'
import { showMainWindow } from 'utils/constants'
import { Page } from 'models/UiState'
import { ShareListFilter } from 'models/ShareList'
import ContactList from 'models/ContactList'
import Contact from 'models/Contact'

/// #if isElectron
import { ipcRenderer } from 'electron'
/// #endif

/**
 * Monitor status change for each Share to trigger a notification
 */
export default ({dispatch, getState}) => next => action => {

  // intercept some action, process them down the chain, analyse the result
  switch (action.type) {
    case ipfsObjectActions.priv.isLocal.toString():
      const state: Store = getState()
      const returnValue = next(action)
      const newState: Store = getState()

      const shares = state.shareList.list
      const newShares = newState.shareList.list
      const contactList: ContactList = state.contactList

      for(let i = 0; i < shares.count(); i++) {
        const share : Share = shares.get(i)
        const newShare : Share = newShares.get(i)

        if((share.status === ShareState.DOWNLOADING
            || share.status === ShareState.PAUSED)
          && newShare.status === ShareState.SHARING) {

          // a Share just completed

          if(share.isAuthor) {
            continue
          }

          const contact: ?Contact = contactList.findContactInPool(share.authorPubkey)

          /// #if isElectron
          const notification = new Notification(`Download completed`, {
            icon: contact ? contact.avatarUrl : null,
            body: share.title,
            requireInteraction: true
          })

          // Show the share when the user click on the notification
          notification.onclick = () => {
            dispatch(uiActions.setPage(Page.SHARING))
            dispatch(sharelistActions.setFilter(ShareListFilter.INBOX))
            dispatch(sharelistActions.setSearch(''))
            dispatch(sharelistActions.setSelected(share.id))
            ipcRenderer.send(showMainWindow)
          }
          /// #endif

          // Export files
          dispatch(shareActions.writeOnDisk(share))
        }
      }

      return returnValue

    default:
      return next(action)
  }
}
