// @flow
import { createAction } from 'redux-actions'
import Identity from 'models/Identity'
import * as profile from './profile'
import * as scheduler from 'utils/scheduler'
import * as chat from './chat'
import * as contactList from './contactList'
import { loginStore, loadFullStore } from 'index'


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
    const fullStore = await loadFullStore(identity.storageKey, identity.identity)
    const fullStoreDispatch = fullStore.dispatch

    await dispatch(priv.selectIdenty(identity))


    // Start listening to chats
    fullStoreDispatch(chat.subscribe())

    // Start listening to contact list events
    fullStoreDispatch(contactList.subscribe())

    // Start publishing the profile periodically
    scheduler.startTimeBetween(fullStoreDispatch,
      'publishProfile',
      profile.publishProfile(),
      5 * 60 * 1000 // 5 minutes
    )

    // Start updating contacts persiodically
    scheduler.startTimeBetween(fullStoreDispatch,
      'updateAllContacts',
      contactList.updateAllContacts(),
      5 * 60 * 1000 //5 minutes
    )
    scheduler.startTimeBetween(fullStoreDispatch,
      'pingAllContacts',
      contactList.pingAllContacts(),
      2 * 60 * 1000 // 2 minutes
    )
  }
}

/**
 * Logout, persist and unload the user data
 * @returns {Promise}
 */
export function logout() {
  return async function (dispatch) {
    await loginStore.dispatch(priv.resetIdentity())

    // Stop any scheduled tasks
    scheduler.stop('publishProfile')
    scheduler.stop('updateAllContacts')
    scheduler.stop('pingAllContacts')

    // Stop listening to chats
    dispatch(chat.unsubscribe())

    // Stop listening to contactList events
    dispatch(contactList.unsubscribe())
  }
}
