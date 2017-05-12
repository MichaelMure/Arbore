// @flow
import React, { Component } from 'react'
import ContactList from 'models/ContactList'
import Contact from 'models/Contact'
import CompactContact from './CompactContact'
import styles from './ContactPage.css'
import { TextField, Typography } from 'material-ui'
import ContactDetail from 'containers/contact/ContactDetail'
import ContactAdder from 'components/contact/ContactAdder'

class ContactPage extends Component {

  props: {
    contacts: ContactList,
    onClickGenerator: (pubkey: string) => () => void,
    onSearchChange: () => void,
  }

  render() {
    const { contacts, onClickGenerator, onSearchChange } = this.props
    const selectedPubKey = contacts.selectedPubkey

    return (
      <div className={styles.wrapper}>
        <div className={styles.list} >
          <TextField label='Search' onChange={onSearchChange} />
          <div className={styles.scroller}>
            <ContactAdder/>
            {
              contacts.searched.map((contact: Contact) =>
                <CompactContact
                  key={ contact.pubkey }
                  contact={contact}
                  selected={contact.pubkey === selectedPubKey}
                  onClick={onClickGenerator(contact.pubkey)}
                />
              )
            }
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.scroller}>
            { selectedPubKey && contacts.contactInSearched(selectedPubKey) && <ContactDetail /> }
          </div>
        </div>
      </div>
    )
  }
}

export default ContactPage
