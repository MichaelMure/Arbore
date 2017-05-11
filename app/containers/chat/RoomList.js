// @flow
import { connect } from 'react-redux'
import type { Store } from 'utils/types'
import RoomList from 'components/chat/RoomList'
import Contact from 'models/Contact'
import * as ui from 'actions/ui'

const mapStateToProps = (state: Store) => ({
  rooms: state.chatRoomList,
  contacts: state.contactList,
  ui: state.ui,
})

const mapDispatchToProps = dispatch => ({
  onClickGenerator: (contact: Contact) => () => {
    dispatch(ui.selectChatRoom(contact.pubkey))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomList)
