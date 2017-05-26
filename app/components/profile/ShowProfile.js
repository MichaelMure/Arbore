// @flow
import React, { Component } from 'react'
import Profile from 'models/Profile'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import styles from './ShowProfile.css'
import FontAwesome from 'react-fontawesome'
import Avatar from 'components/Avatar'

const {clipboard} = require('electron')

class ShowProfile extends Component {

  props: {
    profile: Profile,
    onLogoutClick: () => any,
    onEditClick: () => any
  }

  handlePubkeyToClipboard() {
    // TODO: maybe that need some visual feedback for the user ?
    clipboard.writeText(this.props.profile.pubkey)
  }

  render() {
    const profile = this.props.profile
    return (
      <div>
        <Typography className={styles.identity}>{profile.identity}</Typography>

        { profile.avatarUrl
          ? <Avatar person={profile} className={styles.avatar} />
          : <div className={styles.noAvatar}><Typography>No avatar</Typography></div>
        }

        { profile.bio
          ? <Typography paragraph className={styles.bio}>{profile.bio}</Typography>
          : <Typography paragraph className={styles.bioEmpty}>Write something about you</Typography>
        }

        <Typography align="center" type="body2">
          Share your Arbore ID
        </Typography>
        <Typography className={styles.pubkey} align="center" gutterBottom>
          {profile.pubkey}
          <IconButton className={styles.copyToClipboard} onClick={::this.handlePubkeyToClipboard}>
            <FontAwesome name="clipboard" />
          </IconButton>
        </Typography>

        <div className={styles.buttons}>
          <Button raised onClick={this.props.onEditClick}>
            <FontAwesome name="pencil" />
            Edit profile
          </Button>
          <Button raised primary onClick={this.props.onLogoutClick}>Logout</Button>
        </div>
      </div>
    )
  }
}

export default ShowProfile
