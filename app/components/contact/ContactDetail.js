import React, { Component } from 'react'
import styles from './ContactDetail.css'
import { CardHeader } from 'material-ui/Card'
import { LabelSwitch } from 'material-ui/Switch';
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import FontAwesome from 'react-fontawesome'
import Avatar from 'components/Avatar'
import Contact from 'models/Contact'

class ContactDetail extends Component {

  props: {
    contact: Contact,
    onPrivacyChange: (Contact, boolean) => any
  }

  handlePrivacyChange(event, checked) {
    this.props.onPrivacyChange(this.props.contact, checked)
  }

  render() {
    const contact: Contact = this.props.contact

    return (
      <div className={styles.wrapper} key={contact.pubkey}>
        <div className={styles.header}>
          <CardHeader
            avatar={<Avatar person={contact} />}
            title={contact.identity}
          />
          <IconButton>
            <FontAwesome name='pencil' />
          </IconButton>
        </div>

        <Typography>{contact.bio}</Typography>

        <LabelSwitch
          checked={contact.privacyHidden}
          onChange={::this.handlePrivacyChange}
          label="Hidden"
        />

      </div>
    )
  }
}

export default ContactDetail;
