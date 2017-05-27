// @flow
import React, { Component } from 'react'
import styles from './AddBySuggest.css'
import Button from 'material-ui/Button'
import Contact from 'models/Contact'
import { Set } from 'immutable'
import Avatar from 'components/Avatar'

class AddBySuggest extends Component {

  props: {
    onCancelClick: () => any,
    suggestion: Set<Contact>
  }

  renderContact(contact: Contact) {
    return (
      <div className={styles.suggestWrapper}>
        <Avatar person={contact} className={styles.suggestAvatar}/>
      </div>
    )
  }

  render() {
    const { suggestion } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.suggestions}>
          { suggestion.map(
              (contact: Contact) => this.renderContact(contact)
          )}
        </div>
        <div className={styles.buttons}>
          <Button raised onClick={this.props.onCancelClick}>Cancel</Button>
        </div>
      </div>
    )
  }
}

export default AddBySuggest
