// @flow
import { connect } from 'react-redux'
import type { Store } from 'utils/types'
import RoomList from 'components/chat/RoomList'
import Contact from 'models/Contact'
import * as chat from 'actions/chat'
import * as ui from 'actions/ui'

const mapStateToProps = (state: Store) => ({
  rooms: state.chatRoomList,
  contacts: state.contactList,
  ui: state.ui,
})

const mapDispatchToProps = dispatch => ({
  onRoomClickGenerator: (contact: Contact) => () => {
    dispatch(ui.selectChatRoom(contact.pubkey))
    dispatch(chat.readAllRoom(contact))
  },
  onContactClickgenerator: (contact: Contact) => () => {
    dispatch(chat.createRoom(contact))
    dispatch(ui.selectChatRoom(contact.pubkey))
    dispatch(chat.readAllRoom(contact))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomList)
