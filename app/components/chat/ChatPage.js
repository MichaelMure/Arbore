// @flow
import React, { Component } from 'react'
import styles from './ChatPage.css'
import { Typography } from 'material-ui'
import RoomList from 'containers/chat/RoomList'
import ContactList from 'containers/chat/ContactList'
import Room from 'containers/chat/Room'

class ChatPage extends Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.contacts}>
          <div className={styles.scrollerContact}>
            <Typography>Chats</Typography>
            <RoomList />
            <Typography>Contacts</Typography>
            <ContactList />
          </div>
        </div>
        <Room />
      </div>
    )
  }
}

export default ChatPage
