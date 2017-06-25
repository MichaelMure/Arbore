// @flow
import { createAction } from 'redux-actions'
import ShareList from 'models/ShareList'
import Share, { writable as shareWritable } from 'models/Share'
import ContactList from 'models/ContactList'
import Profile from 'models/Profile'
import type { ShareListFilterType } from 'models/ShareList'
import type { Store } from 'utils/types'
import createProtocol from 'ipfs/createProtocol'
import * as shareActions from 'actions/share'
import Contact from 'models/Contact'

export const setFilter = createAction('SHARELIST_FILTER_SET',
  (filter: ShareListFilterType) => (filter)
)
export const setSelected = createAction('SHARELIST_SELECTED_SET',
  (selectedId: number) => (selectedId)
)
export const setSearch = createAction('SHARELIST_SEARCH_SET',
  (search: string) => (search)
)

export const priv = {
  addShare: createAction('SHARELIST_ADD_SHARE',
    (share: Share) => (share)
  )
}

/**
 * Assign an Id and store the share in the Sharelist
 * @param share
 * @returns {Function}
 */
export function addShare(share: Share) {
  return async function(dispatch, getState) {
    const shareList: ShareList = getState().shareList
    const id = shareList.nextId
    share = share.set(shareWritable.id, id)
    dispatch(priv.addShare(share))
    return share
  }
}

/**
 * Add to the sharelist a Share found in the network
 * @param hash
 * @returns {Function}
 */
export function fetchShareDescription(hash: string) {
  return async function(dispatch, getState) {
    const shareList: ShareList = getState().shareList

    if(shareList.list.some((share: Share) => share.hash === hash)) {
      console.log(`Share ${hash} already know`)
      return
    }

    let share: Share = await dispatch(shareActions.fetchShareDescription(hash))
    share = await dispatch(addShare(share))

    return share
  }
}


/* Network messages */

const protocol = {
  queryShares: createAction('SHARESQUERY',
    (profile: Profile) => ({from: profile.pubkey})
  ),
  sharesReply: createAction('SHARESREPLY',
    (profile: Profile, shares: Array<string>) => ({from: profile.pubkey, shares: shares})
  )
}

let pubsub = null

export function subscribe() {
  return async function (dispatch, getState) {
    const profile: Profile = getState().profile

    pubsub = createProtocol('shareList', profile.sharesPubsubTopic, {
      [protocol.queryShares.toString()]: handleQueryShares,
      [protocol.sharesReply.toString()]: handleSharesReply,
    })

    await dispatch(pubsub.subscribe())
  }
}

export function unsubscribe() {
  return async function (dispatch) {
    await dispatch(pubsub.unsubscribe())
    pubsub = null
  }
}

export function queryShareList(contact: Contact) {
  return async function (dispatch, getState) {
    console.log('Query share list of ' + contact.identity)
    const profile: Profile = getState().profile
    const data = protocol.queryShares(profile)
    await dispatch(pubsub.send(contact.sharesPubsubTopic, data))
  }
}

function handleQueryShares(dispatch, getState, payload) {
  const { from } = payload

  const state: Store = getState()
  const contactList: ContactList = state.contactList
  const contact = contactList.findContact(from)

  if(!contact) {
    console.log('Got a shareList query from unknow contact ' + from)
    return
  }

  const shareList: ShareList = state.shareList
  const profile: Profile = state.profile

  const shares = shareList.getSharesForContact(contact)
    .filter((share: Share) => share.hash !== null)
    .map((share: Share) => share.hash)
    .toArray()

  const data = protocol.sharesReply(profile, shares)
  dispatch(pubsub.send(contact.sharesPubsubTopic, data))
}

async function handleSharesReply(dispatch, getState, payload) {
  const { from, shares } = payload

  const state: Store = getState()
  const contactList: ContactList = state.contactList
  const contact = contactList.findContact(from)

  if(!contact) {
    console.log('Got a shareList from unknow contact ' + from)
    return
  }

  shares.forEach(async (hash: string) => {
    const share: Share = await dispatch(shareActions.fetchShareDescription(hash))
    dispatch(addShare(share))
  })
}
