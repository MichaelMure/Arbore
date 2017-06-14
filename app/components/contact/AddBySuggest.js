// @flow
import React, { Component } from 'react'
import styles from './AddBySuggest.css'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Contact from 'models/Contact'
import Avatar from 'components/common/Avatar'
import FontAwesome from 'react-fontawesome'

class AddBySuggest extends Component {

  props: {
    suggestion: Array<Contact>,
    onCancelClick: () => any,
    onSuggestAcceptGenerator: (Contact) => any,
    onSuggestRefuseGenerator: (Contact) => any,
  }

  renderContact(contact: Contact) {
    return (
      <div key={contact.pubkey} className={styles.suggestWrapper}>
        <div className={styles.suggestActions}>
          <Avatar person={contact} className={styles.suggestAvatar}/>
          <div className={styles.suggestButtons}>
            <Button fab
              onClick={this.props.onSuggestRefuseGenerator(contact)}
              className={styles.suggestReject}>
              <FontAwesome name='times' />
            </Button>
            <Button fab
              onClick={this.props.onSuggestAcceptGenerator(contact)}
              className={styles.suggestAccept}>
              <FontAwesome name='check' />
            </Button>
          </div>
        </div>
        <Typography>{contact.identity}</Typography>
      </div>
    )
  }

  render() {
    const { suggestion } = this.props
    let content
    if(suggestion.length > 0) {
      content = (
        <div className={styles.suggestions}>
        { suggestion.map(
          (contact: Contact) => this.renderContact(contact)
        )}
        </div>
    )} else {
      content = (
        <Typography>No suggestion available</Typography>
    )}

    return (
      <div className={styles.wrapper}>
        { content }
        <div className={styles.buttons}>
          <Button raised onClick={this.props.onCancelClick}>Close</Button>
        </div>
      </div>
    )
  }
}

export default AddBySuggest
