// @flow
import React, { Component } from 'react'
import ChatRoomList from 'models/ChatRoomList'
import styles from './RoomList.css'
import { Typography } from 'material-ui'
import ChatRoom from 'models/ChatRoom'
import ContactList from 'models/ContactList'
import UiState from 'models/UiState'
import Contact from 'models/Contact'

class RoomList extends Component {

  props: {
    rooms: ChatRoomList,
    contacts: ContactList,
    ui: UiState,
    onClickGenerator: (Contact) => any
  }

  render() {
    const { rooms, contacts, ui, onClickGenerator } = this.props
    const selectedRoom: ?string = ui.selectedChat

    return (
      <div>
        {
          rooms.rooms.entrySeq().map(([pubkey, room]) => {

            const contact: Contact = contacts.findContact(pubkey)
            return (
              <div key={pubkey} onClick={onClickGenerator(contact)}>
                <Typography className={styles.chatItem}>{contact.identity}</Typography>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default RoomList
