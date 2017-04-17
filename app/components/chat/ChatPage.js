// @flow
import React, { Component } from 'react'
import styles from './ChatPage.css'
import ContactList from 'models/ContactList'
import { Avatar, Text, TextField } from 'material-ui'
import { Map } from 'immutable'
import Contact from 'models/Contact'
import Profile from 'models/Profile'

class ChatPage extends Component {

  props: {
    profile: Profile,
    contacts: ContactList
  }

  constructor() {
    super()
    this.history = [
      { contact: 'QmQ6TbUShnjKbnJDSYdxaBb78Dz6fF82NMetDKnau3k7zW', time: Date.now(), msg: 'Hello' },
      { contact: 'QmQ6TbUShnjKbnJDSYdxaBb78Dz6fF82NMetDKnau3k7zW', time: Date.now(), msg: 'Hello' },
      { contact: 'QmQ6TbUShnjKbnJDSYdxaBb78Dz6fF82NMetDKnau3k7zW', time: Date.now(), msg: 'Hello' },
      { contact: 'QmQ6TbUShnjKbnJDSYdxaBb78Dz6fF82NMetDKnau3k7zW', time: Date.now(), msg: 'Hello' },
      { contact: 'QmQ6TbUShnjKbnJDSYdxaBb78Dz6fF82NMetDKnau3k7zW', time: Date.now(), msg: 'Hello' },
    ]

    this.chats = [
      { name: 'zqdldz', unread: 3 },
      { name: 'jrrehrg', unread: 0 },
      { name: 'zdzd', unread: 10 },
      { name: 'zqsvfsefsdldz', unread: 3 },
    ]
  }

  renderContact(contacts: Map) {
    return contacts.valueSeq().map((contact: Contact) =>
      <div key={contact.pubkey}>{contact.identity}</div>
    )
  }

  renderChats(chats) {
    return chats.map(({name, unread}, index) => <div key={index}>{name}</div>)
  }

  renderHistory(history) {
    return history.map(({msg, time}, index) => <div key={index}>{msg}</div>)
  }

  render() {
    const profile = this.props.profile
    const contacts = this.props.contacts.contacts

    return (
      <div className={styles.wrapper}>
        <div className={styles.contacts}>
          <div className={styles.scrollerContact}>
            <Text>Chats</Text>
            { this.renderChats(this.chats) }
            <Text>Contacts</Text>
            { this.renderContact(contacts) }
          </div>
        </div>
        <div className={styles.chat}>
          <div className={styles.scrollerChat}>
            { this.renderHistory(this.history) }
          </div>
          <div className={styles.prompt}>
            <Avatar
              src={profile.avatarData}
              className={styles.profileAvatar}
            />
            <TextField label='Write something' className={styles.promptInput} />
          </div>
        </div>
      </div>
    )
  }
}

export default ChatPage
