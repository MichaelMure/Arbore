// @flow
import React, { Component } from 'react'
import styles from './RoomList.css'
import Typography from 'material-ui/Typography'
import ChatRoomList from 'models/ChatRoomList'
import ContactList from 'models/ContactList'
import Contact  from 'models/Contact'
import classNames from 'classnames/bind'
import AvatarWithStatus from 'components/common/AvatarWithStatus'

const cx = classNames.bind(styles);

class RoomList extends Component {

  props: {
    rooms: ChatRoomList,
    contacts: ContactList,
    onRoomClickGenerator: (Contact) => any,
    onContactClickGenerator: (Contact) => any
  }

  render() {
    const {
      rooms,
      contacts,
      onRoomClickGenerator,
      onContactClickGenerator
    } = this.props

    const roomsSeq = rooms.rooms.entrySeq()
      .sortBy(([pubkey, room]) => contacts.findContactInPool(pubkey).identity)

    const contactsSeq = contacts.directoryMapped
      .filter((contact: Contact) => !rooms.rooms.has(contact.pubkey))
      .sortBy((contact: Contact) => contact.identity)

    return (
      <div>
        { roomsSeq.count() > 0 && <Typography type="subheading" gutterBottom>Conversations</Typography> }
        {
          roomsSeq.map(([pubkey, room]) => {
            const contact: Contact = contacts.findContactInPool(pubkey)
            const selected = rooms.selectedChat === pubkey

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
        { contactsSeq.count() > 0 && <Typography type="subheading" gutterBottom>Contacts</Typography> }
        {
          contactsSeq.map((contact: Contact) => (
            <div
              key={contact.pubkey}
              onClick={onContactClickGenerator(contact)}
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
