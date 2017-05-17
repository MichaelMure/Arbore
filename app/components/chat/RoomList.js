// @flow
import React, { Component } from 'react'
import styles from './RoomList.css'
import Typography from 'material-ui/Typography'
import Badge from 'material-ui/Badge'
import ChatRoomList from 'models/ChatRoomList'
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
            const selected = ui.selectedChat === pubkey
            return (
              <div
                key={pubkey}
                onClick={onClickGenerator(contact)}
                className={selected ? styles.selected : null}
              >
                <Badge badgeContent={room.unread} badgeClassName={styles.badge}>
                  <Typography className={styles.chatItem}>{contact.identity}</Typography>
                </Badge>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default RoomList
