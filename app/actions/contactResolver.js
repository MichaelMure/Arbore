import createProtocol from 'ipfs/createProtocol'
import { createAction } from 'redux-actions'
import Contact from 'models/Contact'
import Profile from 'models/Profile'
import * as contactActions from './contact'
import * as ipfsActions from './ipfs'
import type { Store } from 'utils/types'
import isIpfs from 'is-ipfs'

const PUBSUB_TOPIC = 'arbore:contactdiscovery'

// @HACK this file implement a contact resolver through both the DHT and pubsub
// This become necessery as the DHT is not performant enough at the moment (most of the time
// the DHT would not resolve at all when in double-NAT, and is slow in general).
//
// The pubsub based resolver use a unique topic (for queries) for the whole network and thus WILL NOT SCALE.
// This is intended to be a temporary solution while the DHT is being fixed.


export function resolveContact(pubkey: string) {
  return function (dispatch) {
    return Promise.race([
      dispatch(contactActions.fetchProfile(pubkey)), // DHT based lookup
      dispatch(lookupContact(pubkey))                // pubsub based lookup
    ])
  }
}

/* Network messages */

const protocol = {
  lookup: createAction('CONTACT_LOOKUP',
    (profile: Profile, pubkey: string) => ({from: profile.pubkey, pubkey})
  ),
  lookupReply: createAction('CONTACT_REPLY',
    (data: {}) => (data)
  ),
}

let queryPubsub = null
let replyPubsub = null

const callbacks = {}

export function subscribe() {
  return async function (dispatch, getState) {
    const profile: Profile = getState().profile

    queryPubsub = createProtocol('contactDicovery', PUBSUB_TOPIC, {
      [protocol.lookup.toString()]: handleLookup,
    })

    replyPubsub = createProtocol('contactDicovery', profile.contactDiscoveryPubsubTopic, {
      [protocol.lookupReply.toString()]: handleLookupReply,
    })

    await dispatch(queryPubsub.subscribe())
    await dispatch(replyPubsub.subscribe())
  }
}

export function unsubscribe() {
  return async function (dispatch) {
    await dispatch(queryPubsub.unsubscribe())
    queryPubsub = null
    await dispatch(replyPubsub.unsubscribe())
    replyPubsub = null
  }
}

function lookupContact(pubkey: string) {
  return async function (dispatch, getState) {
    const profile: Profile = getState().profile
    const data = protocol.lookup(profile, pubkey)

    // Store a callback for when the reply comes
    const promise = new Promise(resolve => {
      callbacks[pubkey] = resolve
    })

    dispatch(queryPubsub.send(PUBSUB_TOPIC, data))

    return promise
  }
}

async function handleLookup(dispatch, getState, payload) {
  const { from, pubkey } = payload

  if(!isIpfs.multihash(from)) {
    return
  }

  if(!isIpfs.multihash(pubkey)) {
    return
  }

  console.log('Got a contact lookup query from ' + from)

  const state: Store = getState()
  const profile = state.profile
  const contactList = state.contactList

  let reply = null

  const contact = contactList.findContactInPool(pubkey)
  if(contact) {
    reply = contact.publishObject()
  }

  if(profile.pubkey === pubkey) {
    const peerID = await dispatch(ipfsActions.getPeerID())
    reply = profile.publishObject(peerID)
  }

  if(!reply) {
    return
  }

  const data = protocol.lookupReply(reply)
  dispatch(replyPubsub.send(from + '/contactDiscovery', data))
}

function handleLookupReply(dispatch, getState, payload) {
  const contact = Contact.fromProfileData(payload)

  console.log('Got a contact lookup reply for ' + contact.pubkey)

  const callback = callbacks[contact.pubkey]

  if(!callback) {
    return
  }

  delete callback[contact.pubkey]
  callback(contact)
}
