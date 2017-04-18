// @flow
import React, { Component } from 'react'
import styles from './ChatPage.css'
import ContactList from 'models/ContactList'
import { Avatar, Text, TextField } from 'material-ui'
import { Map } from 'immutable'
import Contact from 'models/Contact'
import Profile from 'models/Profile'
import Moment from 'react-moment'

const app = require('electron').remote.app

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
      { contact: 'DZNJZDNKZN', time: Date.now(), msg: 'Hello' },
      { contact: 'DZNJZDNKZN', time: Date.now(), msg: 'Hello' },
      { contact: 'DZNJZDNKZN', time: Date.now(), msg: 'Hello' },
      { contact: 'DZNJZDNKZN', time: Date.now(), msg: 'Hello' },
      { contact: 'DZNJZDNKZN', time: Date.now(), msg: 'Hello' },
      { contact: 'QmQ6TbUShnjKbnJDSYdxaBb78Dz6fF82NMetDKnau3k7zW', time: Date.now(), msg: 'Hello\nzdbzdzad\nzbjkzbdz Hello\nzdbzdzad\nzbjkzbdz Hello\nzdbzdzad\nzbjkzbdz Hello\nzdbzdzad\nzbjkzbdz Hello\nzdbzdzad\nzbjkzbdz Hello\nzdbzdzad\nzbjkzbdz Hello\nzdbzdzad\nzbjkzbdz Hello\nzdbzdzad\nzbjkzbdz Hello\nzdbzdzad\nzbjkzbdz ' },
      { contact: 'QmQ6TbUShnjKbnJDSYdxaBb78Dz6fF82NMetDKnau3k7zW', time: Date.now(), msg: 'Hello' },
      { contact: 'DZNJZDNKZN', time: Date.now(), msg: 'Hello' },
      { contact: 'DZNJZDNKZN', time: Date.now(), msg: 'Hello' },
      { contact: 'DZNJZDNKZN', time: Date.now(), msg: 'Hello' },
    ]

    this.chats = [
      { name: 'zqdldz', unread: 3 },
      { name: 'jrrehrg', unread: 0 },
      { name: 'zdzd', unread: 10 },
      { name: 'zqsvfsefsdldz', unread: 3 },
    ]
  }

  renderContact(contacts: Map) {
    // const classes = this.context.styleManager.render(styleSheet);

    return contacts.valueSeq().map((contact: Contact) =>
      <div key={contact.pubkey} className={styles.contactItem}>
        <Avatar src={contact.avatarData} alt={contact.identity} className={styles.contactAvatar}/>
        {contact.identity}
      </div>
    )
  }

  renderChats(chats) {
    return chats.map(({name, unread}, index) => (
      <Text key={index} className={styles.chatItem}>{name}</Text>)
    )
  }

  renderHistory(history) {
    let contact = null
    let accu = []
    let chunks = []

    // Cluster the history in consecutive contact chunk
    history.forEach(log => {
      if(contact === null) {
        contact = log.contact
      }

      accu.push(log)

      if(log.contact !== contact) {
        chunks.push(accu)
        accu = []
        contact = log.contact
      }
    })

    if(accu.length > 0) {
      chunks.push(accu)
    }

    return chunks.map((chunk, index) => this.renderHistoryChunk(chunk, index))
  }

  renderHistoryChunk(history, key) {
    if(history.length <= 0) {
      return
    }

    const contact: Contact = this.props.contacts.findContact(history[0].contact)
    const time = history[0].time

    return (
      <div key={key} className={styles.cluster}>
        <Avatar src={contact.avatarData} alt={contact.identity} className={styles.clusterAvatar}/>
        <div className={styles.clusterHistory}>
          <div className={styles.clusterHeader}>
            <span>{contact.identity}</span>
            <span><Moment locale={app.getLocale()} format="LT">{time}</Moment></span>
          </div>
          {
            history.map(({time, msg}, index) => (
              <Text key={index}>{msg}</Text>
            ))
          }
        </div>
      </div>
    )
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
              alt={profile.identity}
              className={styles.promptAvatar}
            />
            <TextField label='Write something' className={styles.promptInput} />
          </div>
        </div>
      </div>
    )
  }
}

export default ChatPage
