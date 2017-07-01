// @flow
import React, { Component } from 'react'
import styles from './RoomList.css'
import Typography from 'material-ui/Typography'
import ChatRoomList from 'models/ChatRoomList'
import ContactList from 'models/ContactList'
import UiState from 'models/UiState'
import Contact  from 'models/Contact'
import classNames from 'classnames/bind'
import AvatarWithStatus from 'components/common/AvatarWithStatus'

const cx = classNames.bind(styles);

class RoomList extends Component {

  props: {
    rooms: ChatRoomList,
    contacts: ContactList,
    ui: UiState,
    onRoomClickGenerator: (Contact) => any,
    onContactClickgenerator: (Contact) => any
  }

  render() {
    const {
      rooms,
      contacts,
      ui,
      onRoomClickGenerator,
      onContactClickgenerator
    } = this.props

    const roomsSeq = rooms.rooms.entrySeq()
      .sortBy(([pubkey, room]) => contacts.findContactInPool(pubkey).identity)

    const contactsSeq = contacts.directoryMapped
      .filter((contact: Contact) => !rooms.rooms.has(contact.pubkey))
      .sortBy((contact: Contact) => contact.identity)

    return (
      <div>
        { roomsSeq.count() > 0 && <Typography type="subheading">Conversations</Typography> }
        {
          roomsSeq.map(([pubkey, room]) => {
            const contact: Contact = contacts.findContactInPool(pubkey)
            const selected = ui.selectedChat === pubkey

            const itemClass = cx({
              item: true,
              selected: selected
            })

            return (
              <div
                key={pubkey}
                onClick={onRoomClickGenerator(contact)}
                className={itemClass}
              >
                <AvatarWithStatus person={contact} status={contact.status} avatarClass={styles.avatar} rootClass={styles.status} />
                <Typography className={styles.identity} noWrap>{contact.identity}</Typography>
                { room.unread > 0 &&  <div className={styles.unread}>{room.unread}</div> }
              </div>
            )
          })
        }
        { roomsSeq.count() > 0 && <div className={styles.spacer} /> }
        { contactsSeq.count() > 0 && <Typography type="subheading">Contacts</Typography> }
        {
          contactsSeq.map((contact: Contact) => (
            <div
              key={contact.pubkey}
              onClick={onContactClickgenerator(contact)}
              className={styles.item}
            >
              <AvatarWithStatus person={contact} status={contact.status} avatarClass={styles.avatar} rootClass={styles.status} />
              <Typography className={styles.identity} noWrap>{contact.identity}</Typography>
            </div>
          ))
        }
      </div>
    )
  }
}

export default RoomList
