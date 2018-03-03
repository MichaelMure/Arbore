// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import Typography from 'material-ui/Typography'
import ChatRoomList from 'models/ChatRoomList'
import ContactList from 'models/ContactList'
import Contact  from 'models/Contact'
import AvatarWithStatus from 'components/common/AvatarWithStatus'

class RoomList extends Component {

  props: {
    rooms: ChatRoomList,
    contacts: ContactList,
    onRoomClickGenerator: (Contact) => any,
    onContactClickGenerator: (Contact) => any
  }

  render() {
    const {
      classes,
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

            const itemClass = classNames(classes.item, {
              [classes.selected]: selected
            })

            return (
              <div
                key={pubkey}
                onClick={onRoomClickGenerator(contact)}
                className={itemClass}
              >
                <AvatarWithStatus person={contact} status={contact.status} avatarClass={classes.avatar} rootClass={classes.status} />
                <Typography className={classes.identity} noWrap>{contact.identity}</Typography>
                { room.unread > 0 &&  <div className={classes.unread}>{room.unread}</div> }
              </div>
            )
          })
        }
        { roomsSeq.count() > 0 && <div className={classes.spacer} /> }
        { contactsSeq.count() > 0 && <Typography type="subheading" gutterBottom>Contacts</Typography> }
        {
          contactsSeq.map((contact: Contact) => (
            <div
              key={contact.pubkey}
              onClick={onContactClickGenerator(contact)}
              className={styles.item}
            >
              <AvatarWithStatus person={contact} status={contact.status} avatarClass={classes.avatar} rootClass={classes.status} />
              <Typography className={classes.identity} noWrap>{contact.identity}</Typography>
            </div>
          ))
        }
      </div>
    )
  }
}

const style = theme => ({
  identity: {
    flex: 1,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    paddingTop: 6,
    paddingBottom: 6,

  },
  selected: {
    backgroundColor: theme.palette.background.emphasize,
    borderRadius: 3,
  },
  status: {
    marginRight: 4,
    marginLeft: 4,
  },
  avatar: {
    width: '24px !important',
    height: '24px !important',
    fontSize: '12px !important',
  },
  unread: {
    width: 20,
    height: 20,
    backgroundColor: theme.palette.background.emphasize,
    color: theme.palette.getContrastText(theme.palette.background.emphasize),
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    marginLeft: 4,
  },
  spacer: {
    height: 20,
  }
})

export default withStyles(style)(RoomList)
