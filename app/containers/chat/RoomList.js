// @flow
import { connect } from 'react-redux'
import type { Store } from 'utils/types'
import RoomList from 'components/chat/RoomList'
import Contact from 'models/Contact'
import * as chat from 'actions/chat'

const mapStateToProps = (state: Store) => ({
  rooms: state.chatRoomList,
  contacts: state.contactList,
})

const mapDispatchToProps = dispatch => ({
  onRoomClickGenerator: (contact: Contact) => () => {
    dispatch(chat.selectChatRoom(contact.pubkey))
    dispatch(chat.readAllRoom(contact))
  },
  onContactClickGenerator: (contact: Contact) => () => {
    dispatch(chat.createRoom(contact))
    dispatch(chat.selectChatRoom(contact.pubkey))
    dispatch(chat.readAllRoom(contact))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomList)
