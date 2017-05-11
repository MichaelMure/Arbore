// @flow
import { connect } from 'react-redux'
import type { Store } from 'utils/types'
import ContactList from 'components/chat/ContactList'
import * as chat from 'actions/chat'
import * as ui from 'actions/ui'
import Contact from 'models/Contact'

const mapStateToProps = (state: Store) => ({
  contacts: state.contactList
})

const mapDispatchToProps = dispatch => ({
  onContactClickgenerator: (contact: Contact) => () => {
    dispatch(chat.createRoom(contact))
    dispatch(ui.selectChatRoom(contact.pubkey))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)
