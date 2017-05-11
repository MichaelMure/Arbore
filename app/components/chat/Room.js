// @flow
import React, { Component } from 'react'
import styles from './Room.css'
import { TextField } from 'material-ui'
import ChatRoom from 'models/ChatRoom'
import HistoryChunk from 'components/chat/HistoryChunk'
import ContactList from 'models/ContactList'
import Profile from 'models/Profile'
import Avatar from 'components/Avatar'

class Room extends Component {

  props: {
    selectedRoom: ?ChatRoom,
    contacts: ContactList,
    profile: Profile,
    promptValue: string,
    onPromptKeyDown: (any) => any,
    onPromptChange: (any) => any,
  }

  render() {
    const { selectedRoom, contacts, profile } = this.props

    if(!selectedRoom) {
      return (
        <div className={styles.chat}> </div>
      )
    }

    const history = selectedRoom.chunks.map((chunk, index) =>
      <HistoryChunk
        key={index}
        chunk={chunk}
        person={chunk[0].contacts ? contacts.findContact(chunk[0].contact) : profile}
      />
    )

    return (
      <div className={styles.chat}>
        <div className={styles.scroller}>
          <div className={styles.history}>
            { history }
          </div>
        </div>
        <div className={styles.prompt}>
          <Avatar person={profile} className={styles.promptAvatar} />
          <TextField
            label='Write something'
            className={styles.promptInput}
            onKeyDown={this.props.onPromptKeyDown}
            onChange={this.props.onPromptChange}
            value={this.props.promptValue}
          />
        </div>
      </div>
    )
  }
}

export default Room
