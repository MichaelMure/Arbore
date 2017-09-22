// @flow
import { createAction } from 'redux-actions'
import Identity from 'models/Identity'
import * as profile from './profile'
import * as scheduler from 'utils/scheduler'
import * as chat from './chat'
import * as contactList from './contactList'
import * as settings from './settings'
import * as shareList from './shareList'
import { getLoginStore, getFullStore } from 'store/index'


export const priv = {
  selectIdenty: createAction('IDENTITYLIST_IDENTITY_SELECT',
    (identity: Identity) => (identity)
  ),
  resetIdentity: createAction('IDENTITYLIST_IDENTITY_RESET'),
}

/**
 * Login using the given identity and load the user data
 * @param identity
 * @returns {Promise}
 */
export function login(identity: Identity) {
  return async function (dispatch) {
    const fullStore = await getFullStore(identity.storageKey, identity.identity)
    const fullStoreDispatch = fullStore.dispatch

    await dispatch(priv.selectIdenty(identity))

    // Update the theme with the user settings
    dispatch(settings.setTheme(fullStore.getState().settings.theme))

    // Start listening to network events
    fullStoreDispatch(chat.subscribe())
    fullStoreDispatch(contactList.subscribe())
    fullStoreDispatch(shareList.subscribe())

    // Start publishing the profile periodically
    scheduler.startTimeBetween(fullStoreDispatch,
      'publishProfile',
      profile.publish(),
      60 * 60 * 1000 // 1 hour
    )

    // Start updating contacts persiodically
    scheduler.startTimeBetween(fullStoreDispatch,
      'updateAllContacts',
      contactList.updateAllContacts(),
      60 * 60 * 1000 // 1 hour
    )

    scheduler.startTimeBetween(fullStoreDispatch,
      'pingAllContacts',
      contactList.pingAllContacts(),
      2 * 60 * 1000 // 2 minutes
    )

    scheduler.startTimeBetween(fullStoreDispatch,
      'queryAllContactsList',
      contactList.queryAllContactsList(),
      60 * 60 * 1000 // 1 hour
    )

    scheduler.startTimeBetween(fullStoreDispatch,
      'updateDownloadingLocalities',
      shareList.updateDownloadingLocalities(),
      30 * 1000 // 30 seconds
    )

    // Check the locality of the content
    fullStoreDispatch(shareList.updateAllLocalities())
  }
}

/**
 * Logout, persist and unload the user data
 * @returns {Promise}
 */
export function logout() {
  return async function (dispatch) {
    const loginStore = await getLoginStore()
    await loginStore.dispatch(priv.resetIdentity())

    // Stop any scheduled tasks
    scheduler.stopAll()

    // Stop listening to network events
    dispatch(chat.unsubscribe())
    dispatch(contactList.unsubscribe())
    dispatch(shareList.unsubscribe())
  }
}
