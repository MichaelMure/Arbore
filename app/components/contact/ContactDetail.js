// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
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
import Contact  from 'models/Contact'
import Settings from 'models/Settings'
import Pubkey from 'components/common/Pubkey'
import InsetText from 'components/common/InsetText'
import AvatarWithStatus from 'components/common/AvatarWithStatus'

class ContactDetail extends Component {

  props: {
    contact: Contact,
    settings: Settings,
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
    const { classes } = this.props

    return (
      <div className={classes.wrapper} key={contact.pubkey}>
        <div className={classes.header}>
          <AvatarWithStatus person={contact} status={contact.status} avatarClass={classes.avatar} rootClass={classes.status} />
          <div className={classes.headerContent}>
            <div className={classes.name}>
              <Typography variant="title">{contact.identity}</Typography>
            </div>
            <Pubkey pubkey={contact.pubkey} />
          </div>
        </div>

        <InsetText text={contact.bio} placeholder='No biography' />

        {(this.props.isInDirectory && this.props.settings.directoryPrivacy) &&
          <Typography color='secondary'>Privacy is already enabled globally in the settings</Typography>
        }

        {this.props.isInDirectory &&
          <Typography variant='caption' className={classes.privacy}>
            To help your contacts to find new people easily, Arbore will share your directory with them (and only them).
            You can hide a contact here.
            <FormControlLabel
              control={<Switch checked={contact.privacyHidden} onChange={::this.handlePrivacyChange}/>}
              label={contact.privacyHidden ? 'Hidden' : 'Visible'}
              className={classes.form}
            />
          </Typography>
        }

        { this.props.isInDirectory &&
          <div className={classes.buttons}>
            <Button variant='raised' color='primary' onClick={::this.handleOpenConfirm}>Delete</Button>
          </div>
        }

        { !this.props.isInDirectory &&
          <div className={classes.buttons}>
            <Button variant='raised' color='primary' onClick={this.props.onAddClickGenerator(contact)}>
              Add contact
            </Button>
          </div>
        }

        { this.state.confirmOpen &&
          <Dialog open={true} onClose={this.handleCloseConfirm}>
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

const style = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 100,
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 10000,
  },
  avatar: {
    width: '90px !important',
    height: '90px !important',
  },
  status: {
    marginRight: 10,
  },
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  privacy: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  form: {
    marginLeft: 5,
  },
  buttons: {
    display: 'inline-flex',
    justifyContent: 'flex-end',
  }
})

export default withStyles(style)(ContactDetail)
