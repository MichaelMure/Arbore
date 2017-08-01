import React, { Component } from 'react'
import styles from './ContactDetail.css'
import { FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Contact, { ContactStatus } from 'models/Contact'
import Pubkey from 'components/common/Pubkey'
import InsetText from 'components/common/InsetText'
import AvatarWithStatus from 'components/common/AvatarWithStatus'

class ContactDetail extends Component {

  props: {
    contact: Contact,
    isInDirectory: boolean,
    onPrivacyChange: (Contact, boolean) => any,
    onDeleteClickGenerator: (Contact) =>  any,
    onAddClickGenerator: (Contact) => any,
  }

  state = {
    confirmOpen: false,
  }

  handlePrivacyChange(event, checked) {
    this.props.onPrivacyChange(this.props.contact, checked)
  }

  handleOpenConfirm() {
    this.setState({
      confirmOpen: true,
    })
  }

  handleCloseConfirm() {
    this.setState({
      confirmOpen: false,
    })
  }

  handleDeleteContact() {
    this.setState({
      confirmOpen: false,
    })
    this.props.onDeleteClickGenerator(this.props.contact)()
  }

  render() {
    const contact: Contact = this.props.contact

    return (
      <div className={styles.wrapper} key={contact.pubkey}>
        <div className={styles.header}>
          <AvatarWithStatus person={contact} status={contact.status} avatarClass={styles.avatar} rootClass={styles.status} />
          <div className={styles.headerContent}>
            <div className={styles.name}>
              <Typography type="title">{contact.identity}</Typography>
            </div>
            <Pubkey pubkey={contact.pubkey} />
          </div>
        </div>

        <InsetText text={contact.bio} placeholder='No biography' />

        <FormControlLabel
          control={<Switch checked={contact.privacyHidden} onChange={::this.handlePrivacyChange}/>}
          label="Hidden"
        />

        { contact.status === ContactStatus.ONLINE &&
          <Typography>Last ping: { contact.lastPongDelay } ms</Typography>
        }

        { this.props.isInDirectory &&
          <Button raised color='primary' onClick={::this.handleOpenConfirm}>
            Delete contact
          </Button>
        }

        { !this.props.isInDirectory &&
          <Button raised color='primary' onClick={this.props.onAddClickGenerator(contact)}>
            Add contact
          </Button>
        }

        { this.state.confirmOpen &&
          <Dialog open={true} onRequestClose={this.handleCloseConfirm}>
            <DialogTitle>Confirm contact deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to remove this contact ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={::this.handleCloseConfirm} color='primary'>Cancel</Button>
              <Button onClick={::this.handleDeleteContact} color='primary'>Confirm</Button>
            </DialogActions>
          </Dialog>
        }
      </div>
    )
  }
}

export default ContactDetail
