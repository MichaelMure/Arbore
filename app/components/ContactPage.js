// @flow
import React, { Component } from 'react'
import ContactList from '../models/ContactList'
import Contact from '../models/Contact'
import { Avatar } from 'material-ui'
// import styles from './ContactPage.css'

class ContactPage extends Component {

  props: {
    contacts: ContactList
  }

  static defaultProps = {}

  render() {

    // TODO: good key id
    const contacts = this.props.contacts.list
      .map((contact: Contact) => (
        <div key={contact.pubkey}>
          <Avatar
            alt={contact.identity}
            src={contact.avatarData}
          />
          {contact.identity}
        </div>
      ))

    return (
      <div>
        {contacts}
      </div>
    )
  }
}

export default ContactPage
