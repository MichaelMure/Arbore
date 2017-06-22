// @flow
import React, { Component } from 'react'
import styles from './ChatPage.css'
import RoomList from 'containers/chat/RoomList'
import Room from 'containers/chat/Room'
import ContactList from 'models/ContactList'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

class ChatPage extends Component {

  props: {
    contacts: ContactList,
    onGoToContactClick: () => any,
  }

  render() {
    if(this.props.contacts.directory.count() <= 0) {
      return (
        <div className={styles.noContact}>
          <Typography type="subheading">Ho no !</Typography>
          <Typography>It seems that you have no contact yet.</Typography>
          <div className={styles.spacer} />
          <Button raised primary onClick={this.props.onGoToContactClick}>Go to the contact management</Button>
        </div>
      )
    }

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
