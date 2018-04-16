// @flow
import { createAction } from 'redux-actions'
import Contact from 'models/Contact'
import { IpfsConnector } from '@michaelmure/ipfs-connector'
import { waitForIpfsReady } from 'ipfs/index'
import removeIpfsPrefix from 'utils/removeIpfsPrefix'

export const updateContact = createAction('CONTACTLIST_CONTACT_UPDATE',
  (contact: Contact) => (contact)
)
export const setAvatar = createAction('CONTACT_AVATAR_SET',
  (pubkey: string, hash: ?string) => ({pubkey, hash})
)
export const setPrivacy = createAction('CONTACT_PRIVACY_SET',
  (pubkey: string, hidden: boolean) => ({pubkey, hidden})
)
export const setPingToken = createAction('CONTACT_PING_TOKEN',
  (pubkey: string, token: string) => ({pubkey, token})
)
export const pingResult = createAction('CONTACT_PING_RESULT',
  (pubkey: string, result: boolean) => ({pubkey, result})
)
export const addedAck = createAction('CONTACT_ADDED_ACK',
  (pubkey: string) => ({pubkey})
)

export function fetchProfile(pubkey: string) {
  return async function (dispatch) {
    console.log('fetch contact profile: ' + pubkey)
    const ipfs = IpfsConnector.getInstance()

    await waitForIpfsReady()

    const path = await ipfs.api.apiClient.name.resolve(pubkey)
    console.log(pubkey + ' resolve to ' + path)

    const data = await ipfs.api.getObject(removeIpfsPrefix(path))
    console.log(data)

    const contact: Contact = Contact.fromProfileData(data)

    if(pubkey !== contact.pubkey) {
      throw 'Received a different pubkey (' + contact.pubkey + ') than expected (' + pubkey + ')'
    }

    await dispatch(fetchProfileAvatar(pubkey, contact.avatarHash))

    // For temporary connectivity improvement until ipfs solve this,
    // we dial an explicit relay connection (through a bootstrap node
    // most likely)
    dispatch(relayConnect(contact))

    return contact
  }
}

export function fetchProfileAvatar(pubkey: string, avatarHash: ?string) {
  return async function (dispatch) {
    if(!avatarHash) {
      console.log('No avatar to fetch')
      return
    }

    console.log('fetch contact avatar: ' + pubkey)
    const ipfs = IpfsConnector.getInstance()

    await waitForIpfsReady()

    // TODO: limit the size of accepted avatar before pinning
    await ipfs.api.apiClient.pin.add(avatarHash)
  }
}

/**
 * @HACK temporary fix around the bad double NAT connectivity
 * Dial a relay connection to the known peer ID of the contact
 */
export function relayConnect(contact: Contact) {
  return async function () {
    console.log('Initiate relay connection to ' + contact.identity)

    if(contact.peerID === null) {
      throw 'No valid peer ID'
    }

    const ipfs = IpfsConnector.getInstance()

    await waitForIpfsReady()

    await ipfs.api.apiClient.swarm.connect('/p2p-circuit/ipfs/' + contact.peerID)
  }
}
