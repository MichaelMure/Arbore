// @flow
import React, { Component } from 'react'
import styles from './RecipientsInput.css'
import Chip from 'material-ui/Chip'
import Input from 'material-ui/Input'
import { FormControl, FormLabel } from 'material-ui/Form'
import Avatar from 'components/common/Avatar'
import Contact from 'models/Contact'
import ContactList from 'models/ContactList'

class RecipientsInput extends Component {
  recipientsInput

  props: {
    contactList: ContactList,
  }

  handleRecipientInputChange(e) {
    const { input: { value, onChange} } = this.props
    if (e.key === 'Enter') {
      if(!e.target.value) {
        e.preventDefault()
        return
      }
      const suggest = this.props.contactList.autoComplete(e.target.value)

      // Use Set to deduplicate the elements
      const newRecipients = [ ...new Set( [].concat(
        ...value,
        suggest
      ))]

      onChange(newRecipients)
      e.target.value = ''
      e.preventDefault()
    }
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
    const { label, input: { value }, meta: { touched, error } } = this.props
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

          {/* TODO: need https://github.com/callemall/material-ui/issues/4783 */}
          <Input
            ref={(input) => { this.recipientsInput = input }}
            disableUnderline
            className={styles.recipientsInput}
            onKeyPress={ ::this.handleRecipientInputChange }
          />
        </div>
      </FormControl>
    )
  }
}

export default RecipientsInput
