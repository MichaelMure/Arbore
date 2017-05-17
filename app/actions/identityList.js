// @flow
import { createAction } from 'redux-actions'
import Identity from 'models/Identity'
import { changeStorePrefix, resetStorePrefix } from 'store'
import * as profile from './profile'
import * as scheduler from 'utils/scheduler'
import * as chat from './chat'
import Profile from 'models/Profile'

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
    // changeStorePrefix will flush the current profile on storage and load
    // the new one with the given prefix.
    // We still need to store the selected identity
    await changeStorePrefix(identity.pubkey)
    await dispatch(priv.selectIdenty(identity))

    // Start publishing the profile periodically
    scheduler.startTimeBetween(dispatch, 'publishProfile', profile.publishProfile(), 5 * 60 * 1000) // 5 minutes

    // Start listening to chats
    dispatch(chat.subscribeToChats())
  }
}

/**
 * Logout, persist and unload the user data
 * @returns {Promise}
 */
export function logout() {
  return async function (dispatch, getState) {
    const profile: Profile = getState().profile

    await dispatch(priv.resetIdentity())
    await resetStorePrefix()

    // Stop any scheduled tasks
    scheduler.stop('publishProfile')

    // Stop listening to chats
    dispatch(chat.unsubscribeFromChats(profile))
  }
}
