// @flow
import React, { Component } from 'react'
import Avatar from 'components/Avatar'
import styles from './ContactList.css'
import Contact from 'models/Contact'
import ContactListModel from 'models/ContactList'

class ContactList extends Component {

  props: {
    contacts: ContactListModel,
    onContactClickgenerator: (Contact) => any
  }

  render() {
    const { contacts, onContactClickgenerator } = this.props

    const list = contacts.contacts.valueSeq().map((contact: Contact) =>
      <div
        key={contact.pubkey}
        className={styles.contactItem}
        onClick={onContactClickgenerator(contact)}
      >
        <Avatar person={contact} className={styles.contactAvatar} />
        {contact.identity}
      </div>
    )

    return (
      <div>
        { list }
      </div>
    )
  }
}

export default ContactList
