// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Chip from 'material-ui/Chip'
import Typography from 'material-ui/Typography'
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
    const { classes, contactList, label, input: { value }, meta: { touched, error } } = this.props
    return (
      <FormControl error={touched && (error != null)} style={{ marginTop: '10px' }} >
        <FormLabel>{label}</FormLabel>
        <div className={classes.recipients} onClick={ () => this.recipientsInput.focus() }>
          {
            (value || []).map((contact: Contact) => (
              <Chip
                key={contact.pubkey}
                avatar={<Avatar person={contact} />}
                label={<Typography noWrap>{contact.identity}</Typography>}
                onDelete={ () => ::this.handleRemoveContact(contact.pubkey) }
                classes={{root: classes.chip, label: classes.label}}
              />
            ))
          }

          <RecipientsInputAutocomplete
            inputRef={(autocomplete) => { if(autocomplete) { this.recipientsInput = autocomplete.input }}}
            contactList={contactList}
            onRecipientSelect={::this.handleRecipientSelect}
            selected={value || []}
          />
        </div>
      </FormControl>
    )
  }
}

const style = theme => ({
  recipients: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    border: 'rgb(225, 225, 225) 1px solid',
    minHeight: 100,
    '& > *': {
      margin: 5,
    }
  },
  chip: {
    maxWidth: 200,
  },
  label: {
    minWidth: 0,
    overflow: 'hidden',
  }
})

export default withStyles(style)(RecipientsInput)
