// @flow
import React, { Component } from 'react'
import styles from './AddBySuggest.css'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Contact from 'models/Contact'
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
    let content
    if(suggestion.size > 0) {
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
          <Button raised onClick={this.props.onCancelClick}>Cancel</Button>
        </div>
      </div>
    )
  }
}

export default AddBySuggest
