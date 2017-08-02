// @flow
import React, { Component } from 'react'
import styles from './RecipientsInput.css'
import Chip from 'material-ui/Chip'
import { FormControl, FormLabel } from 'material-ui/Form'
import Avatar from 'components/common/Avatar'
import Contact from 'models/Contact'
import ContactList from 'models/ContactList'
import RecipientsInputAutocomplete from 'components/sharing/RecipientsInputAutocomplete'

class RecipientsInput extends Component {
  recipientsInput: any

  props: {
    contactList: ContactList,
  }

  handleRecipientSelect(contact: Contact) {
    const { input: { value, onChange} } = this.props

    // Use Set to deduplicate the elements
    const newRecipients = [ ...new Set( [].concat(
      ...value,
      contact
    ))]

    onChange(newRecipients)
  }

  handleRemoveContact(pubkey: string) {
    const { input: { value, onChange} } = this.props
    onChange(
      value.filter(
        (contact: Contact) => contact.pubkey !== pubkey
      )
    )
  }

  render() {
    const { contactList, label, input: { value }, meta: { touched, error } } = this.props
    return (
      <FormControl error={touched && (error != null)} style={{ marginTop: '10px' }} >
        <FormLabel>{label}</FormLabel>
        <div className={styles.recipients} onClick={ () => this.recipientsInput.focus() }>
          {
            (value || []).map((contact: Contact) => (
              <Chip
                key={contact.pubkey}
                avatar={<Avatar person={contact} />}
                label={contact.identity}
                onRequestDelete={ () => ::this.handleRemoveContact(contact.pubkey) }
              />
            ))
          }

          <RecipientsInputAutocomplete
            inputRef={(autocomplete) => { if(autocomplete) { this.recipientsInput = autocomplete.input }}}
            contactList={contactList}
            onRecipientSelect={::this.handleRecipientSelect}
          />
        </div>
      </FormControl>
    )
  }
}

export default RecipientsInput
