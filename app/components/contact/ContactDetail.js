import React, { Component } from 'react'
import styles from './ContactDetail.css'
import { CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import FontAwesome from 'react-fontawesome'
import Avatar from 'components/Avatar'
import Contact from 'models/Contact'

class ContactDetail extends Component {

  props: {
    contact: Contact,
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

      </div>
    )
  }
}

export default ContactDetail;
