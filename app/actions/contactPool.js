// @flow
import { createAction } from 'redux-actions'
import Contact from 'models/Contact'
import ContactPool from 'models/ContactPool'
import type { Store } from 'utils/types'
import * as contactAction from 'actions/contact'

export const storeContactList = createAction('CONTACTPOOL_STORE_CONTACTLIST',
  (contact: Contact, list: Array<string>) => ({contact, list})
)
export const addedAsContact = createAction('CONTACTPOOL_ADDEDASCONTACT',
  (pubkey: string) => ({pubkey})
)

export const priv = {
  storeContactInPool: createAction('CONTACTPOOL_STORE_CONTACT',
    (contact: Contact) => ({contact})
  )
}

export function fetchContactIfMissing(pubkey: string) {
  return async function(dispatch, getState) {
    const state: Store = getState()
    const pool: ContactPool = state.contactPool

    if(pool.pool.has(pubkey)) {
      return
    }

    await fetchContactForPool(pubkey, dispatch)
  }
}

export function fetchAllMissingContacts() {
  // TODO + scheduler
  return async function(dispatch, getState) {
    const state: Store = getState()
    const pool: ContactPool = state.contactPool

    const missing: Set<string> = pool.missingInPool

    missing.forEach(async (pubkey: string) => (
      await fetchContactForPool(pubkey, dispatch)
    ))
  }
}

async function fetchContactForPool(pubkey: string, dispatch) {
  try {
    const contact: Contact = await dispatch(contactAction.fetchProfile(pubkey))
    dispatch(priv.storeContactInPool(contact))
  } catch (err) {
    console.log(`Contact ${pubkey} unavailable: ${err}`)
  }
}

export function updateAllContacts() {
  // TODO + scheduler
}

export function garbageCollect() {
  // TODO + scheduler
  // clean the contact pool for outdated contact
}
