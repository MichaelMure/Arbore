// @flow
import React, { Component } from 'react'
import styles from './ChatPage.css'
import RoomList from 'containers/chat/RoomList'
import Room from 'containers/chat/Room'

class ChatPage extends Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.contacts}>
          <div className={styles.scrollerContact}>
            <RoomList />
          </div>
        </div>
        <Room />
      </div>
    )
  }
}

export default ChatPage
