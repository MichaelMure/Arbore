// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import { Map } from 'immutable'
import ContactList from 'models/ContactList'
import ShareRecipient from 'models/ShareRecipient'
import Avatar from 'components/common/Avatar'
import Contact from 'models/Contact'

class ShareRecipients extends Component {

  props: {
    recipients: Map<string,ShareRecipient>,
    contactList: ContactList,
    onContactClickGenerator: (?Contact) => any
  }

  render() {
    const { classes, recipients, contactList, onContactClickGenerator } = this.props

    const avatars = recipients.keySeq()
      .map((pubkey: string) => contactList.findContactInPool(pubkey))
      .map((contact: ?Contact, index) => (
        <Avatar
          key={contact ? contact.pubkey : index}
          person={contact}
          className={classes.avatar}
          onClick={onContactClickGenerator(contact)}
        />
      ))

    return (
      <div className={classes.wrapper}>
        {avatars}
      </div>
    )
  }
}

const styleSheet = createStyleSheet('ShareRecipients', theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  avatar: {
    margin: 5,
    userSelect: 'none',
    cursor: 'pointer',
  },
}))

export default withStyles(styleSheet)(ShareRecipients)
