// @flow
import { createAction } from 'redux-actions'
import Contact from 'models/Contact'
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import { waitForIpfsReady } from 'ipfs/index'
import removeIpfsPrefix from 'utils/removeIpfsPrefix'
import * as contactListAction from 'actions/contactList'

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

    const { Path } = await ipfs.api.apiClient.name.resolve(pubkey)
    console.log(pubkey + ' resolve to ' + Path)

    const data = await ipfs.api.getObject(removeIpfsPrefix(Path))
    console.log(data)

    const contact: Contact = Contact.fromProfileData(pubkey, data)
    await dispatch(fetchProfileAvatar(pubkey, contact.avatarHash))

    return contact
  }
}

export function forceFetchProfile(pubkey){
  return async function (dispatch,getState) {
    const contactList: ContactList = getState().contactList
    let contact : ?Contact = contactList.findContact(pubkey)

    if(contact)
      return contact;

    console.log('fetch contact profile: ' + pubkey)
    const ipfs = IpfsConnector.getInstance()

    await waitForIpfsReady()


    const { Path } = await ipfs.api.apiClient.name.resolve(pubkey)
    console.log(pubkey + ' resolve to ' + Path)

    const data = await ipfs.api.getObject(removeIpfsPrefix(Path))
    console.log(data)

    contact = Contact.fromProfileData(pubkey, data)
    await dispatch(contactListAction.priv.storeContactInDirectory(contact))
    await dispatch(fetchProfileAvatar(pubkey, contact.avatarHash))

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
