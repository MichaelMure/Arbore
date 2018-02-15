// @flow
import React, { Component } from 'react'
import styles from './ContactPage.css'
import ContactList from 'models/ContactList'
import Contact from 'models/Contact'
import CompactContact from './CompactContact'
import ContactDetail from 'containers/contact/ContactDetail'
import ContactAdder from 'components/contact/ContactAdder'
import SearchField from '../SearchField'

class ContactPage extends Component {

  props: {
    contacts: ContactList,
    onClickGenerator: (pubkey: string) => () => void,
    onSearchChange: () => void,
  }

  render() {
    const { contacts, onClickGenerator, onSearchChange } = this.props
    const selectedPubKey = contacts.selectedPubkey
    const list = contacts.searched.sortBy((contact: Contact) => contact.identity)

    return (
      <div className={styles.wrapper}>
        <div className={styles.list} >
          <SearchField onChange={onSearchChange} />
          <div className={styles.scroller}>
            <ContactAdder/>
            {
              list.map((contact: Contact) =>
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
            { selectedPubKey && <ContactDetail /> }
          </div>
        </div>
      </div>
    )
  }
}

export default ContactPage
