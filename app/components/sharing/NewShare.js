// @flow
import React, { Component } from 'react'
import styles from './NewShare.css'
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'
import Input from 'material-ui/Input'
import { FormControl, FormLabel } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import Contact from 'models/Contact'
import ContactList from 'models/ContactList'
import Avatar from 'components/Avatar'

class NewShare extends Component {

  props: {
    contactList: ContactList
  }

  handleRecipientInputChange(e) {
    if (e.key === 'Enter') {
      const suggest = this.props.contactList.suggestContact(e.target.value)

      // Use Set to deduplicate the elements
      const newRecipients = [ ...new Set( [].concat(
        ...this.state.recipients,
        suggest
      ))]

      this.setState({
        recipients: newRecipients
      })
      e.target.value = ''
    }
  }

  handleRemoveContact(pubkey: string) {
    this.setState({
      recipients: this.state.recipients.filter(
        (contact: Contact) => contact.pubkey !== pubkey
      )
    })
  }

  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      recipients: [],
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>

        <TextField
          id="title"
          label="Title"
          required
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        />

        <TextField
          id="description"
          label="Description"
          // TODO: waiting for merge in material-ui https://github.com/callemall/material-ui/pull/6553
          // multiline
          value={this.state.description}
          onChange={(event) => this.setState({ description: event.target.value })}
        />

        <FormControl style={{ marginTop: '10px' }} >
          <FormLabel>Recipients</FormLabel>
          <div className={styles.recipients} onClick={ () => this.recipientsInput.focus() }>
            {
              this.state.recipients.map((contact: Contact) => (
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

        <FormControl style={{ marginTop: '10px' }}>
          <FormLabel>Content</FormLabel>
          <div className={styles.content}>

          </div>
        </FormControl>

        <div className={styles.buttons}>
          <Button raised onClick={ () => false }>Cancel</Button>
          <Button raised primary onClick={ () => false }>Share</Button>
        </div>
      </div>
    )
  }
}

export default NewShare
