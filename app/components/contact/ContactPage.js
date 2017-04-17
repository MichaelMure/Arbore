// @flow
import React, { Component } from 'react'
import ContactList from 'models/ContactList'
import Contact from 'models/Contact'
import ContactDetail from './ContactDetail'
// import styles from './ContactPage.css'

class ContactPage extends Component {

  props: {
    contacts: ContactList
  }

  render() {
    const contacts = this.props.contacts.contacts.valueSeq()
      .map((contact: Contact) => <ContactDetail key={ contact.pubkey } contact={contact} />)

    return (
      <div>
        {contacts}
      </div>
    )
  }
}

export default ContactPage
