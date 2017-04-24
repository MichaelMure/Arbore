// @flow
import React, { Component } from 'react'
import styles from './NewShare.css'
import { Avatar, Button, Chip, FormControl, FormLabel, Input, Text, TextField } from 'material-ui'
import Contact from 'models/Contact'
import ContactList from 'models/ContactList'


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
                  avatar={<Avatar src={contact.avatarData} />}
                  label={contact.identity}
                  onRequestDelete={ () => ::this.handleRemoveContact(contact.pubkey) }
                  className={styles.chip}
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

        <Button accent onClick={ () => false } className={styles.submit}>Share</Button>
      </div>
    )
  }
}

export default NewShare
