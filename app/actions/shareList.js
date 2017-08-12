// @flow
import { createAction } from 'redux-actions'
import ShareList, { ShareListFilter } from 'models/ShareList'
import Share, { writable as shareWritable } from 'models/Share'
import ContactList from 'models/ContactList'
import Profile from 'models/Profile'
import type { ShareListFilterType } from 'models/ShareList'
import type { Store } from 'utils/types'
import createProtocol from 'ipfs/createProtocol'
import * as shareActions from 'actions/share'
import * as contactListActions from 'actions/contactList'
import * as uiActions from 'actions/ui'
import Contact from 'models/Contact'
import isIpfs from 'is-ipfs'
import { Page } from 'models/UiState'
import { ipcRenderer } from 'electron'
import { showMainWindow } from 'utils/constants'

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
export function storeShare(share: Share) {
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

    let share: ?Share = shareList.findByHash(hash)
    if(share) {
      console.log(`Share ${hash} already know`)
      return share
    }

    share = await dispatch(shareActions.fetchDescription(hash))

    return share
  }
}

/**
 * Update the locality of all shares
 */
export function updateAllLocalities() {
  return async function(dispatch, getState) {
    const state: Store = getState()
    const shareList: ShareList = state.shareList

    await Promise.all(
      shareList.list.map((share: Share) => dispatch(shareActions.updateLocality(share)))
    )
  }
}

// Execute anything needed when we find that a contact in online
//  - push the shares that has not been notified properly
export function onContactPong(contact: Contact) {
  return async function(dispatch, getState) {
    const state: Store = getState()
    const sharelist : ShareList = state.shareList

    // Stop on the first error
    await Promise.all(
      sharelist.getUnNotifiedSharesForContact(contact).valueSeq().map((share: Share) => {
        dispatch(sendShare(share, contact.pubkey))
      })
    )
  }
}

/* Network messages */

const protocol = {
  queryShares: createAction('SHARESQUERY',
    (profile: Profile) => ({from: profile.pubkey})
  ),
  sharesReply: createAction('SHARESREPLY',
    (profile: Profile, shares: Array<string>) => ({from: profile.pubkey, shares: shares})
  ),
  sharePush: createAction('SHAREPUSH',
    (profile: Profile, hash: string) => ({from: profile.pubkey, hash: hash})
  ),
  shareAck: createAction('SHAREACK',
    (profile: Profile, hash: string) => ({from: profile.pubkey, hash: hash})
  )
}

let pubsub = null

export function subscribe() {
  return async function (dispatch, getState) {
    const profile: Profile = getState().profile

    pubsub = createProtocol('shareList', profile.sharesPubsubTopic, {
      [protocol.queryShares.toString()]: handleQueryShares,
      [protocol.sharesReply.toString()]: handleSharesReply,
      [protocol.sharePush.toString()]: handleSharePush,
      [protocol.shareAck.toString()]: handleShareAck,
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
  const contact = contactList.findContactInDirectory(from)

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
  const contact = contactList.findContactInDirectory(from)

  if(!contact) {
    console.log('Got a shareList from unknow contact ' + from)
    return
  }

  await Promise.all(shares.map(async (hash: string) => {
    if(!isIpfs.multihash(hash)) {
      throw 'invalid hash'
    }

    await handleNewShare(dispatch, contact, hash)
  }))

  dispatch(contactListActions.fetchAllMissingContacts())
}

export function sendShare(share: Share, pubkey: string) {
  return async function (dispatch, getState) {
    console.log('Send share notification to ' + pubkey)
    const profile: Profile = getState().profile

    // Publish the share if needed
    if(! share.hash) {
      share = await dispatch(shareActions.publish(share))
    }

    const data = protocol.sharePush(profile, share.hash)
    await dispatch(pubsub.send(Contact.sharesPubsubTopic(pubkey), data))
  }
}

async function handleSharePush(dispatch, getState, payload) {
  const { from, hash } = payload

  const state: Store = getState()
  const contactList: ContactList = state.contactList
  const contact = contactList.findContactInDirectory(from)

  if(!contact) {
    console.log('Got a share notification from unknow contact ' + from)
    return
  }

  if(!isIpfs.multihash(hash)) {
    throw 'invalid hash'
  }

  // Send ACK
  const profile = getState().profile
  const data = protocol.shareAck(profile, hash)
  dispatch(pubsub.send(contact.sharesPubsubTopic, data))


  const shareList: ShareList = state.shareList
  const storedShare: ?Share = shareList.findByHash(hash)

  if(storedShare) {
    console.log('Got a share notification that we already knew: ' + storedShare.title)
    return
  }

  await handleNewShare(dispatch, contact, hash)

  dispatch(contactListActions.fetchAllMissingContacts())
}

// Helper to factorize the handling code for a new incoming Share
async function handleNewShare(dispatch, contact: Contact, hash: string) {
  let share: Share = await dispatch(fetchShareDescription(hash))
  share = await dispatch(storeShare(share))

  /// #if isElectron
  const notification = new Notification(`New share from ${contact.identity}`, {
    icon: contact.avatarUrl,
    body: share.title,
    requireInteraction: true
  })

  // Show the share when the user click on the notification
  notification.onclick = () => {
    dispatch(uiActions.setPage(Page.SHARING))
    dispatch(setFilter(ShareListFilter.AVAILABLE))
    dispatch(setSearch(''))
    dispatch(setSelected(share.id))
    ipcRenderer.send(showMainWindow)
  }
  /// #endif
}

function handleShareAck(dispatch, getState, payload) {
  const { from, hash } = payload

  const state: Store = getState()
  const contactList: ContactList = state.contactList
  const contact = contactList.findContactInDirectory(from)

  if(!contact) {
    console.log('Got a share notification ack from unknow contact ' + from)
    return
  }

  const shareList: ShareList = state.shareList
  const share: ?Share = shareList.findByHash(hash)

  if(!share) {
    console.log('Got a share notification ack for an unknow share ' + hash)
    return
  }

  if(!share.isAuthor) {
    console.log('Got a share notification ACK for a Share that we didn\'t authored')
    return
  }
  if(!share.hasRecipient(contact.pubkey)) {
    console.log('Got a share notification ack that does not match the recipients of the Share')
    return
  }

  dispatch(shareActions.setRecipientNotified(share, contact.pubkey))
}
