// @flow
import React, { Component } from 'react'
import styles from './ShowProfile.css'
import Profile from 'models/Profile'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import FontAwesome from 'react-fontawesome'
import Avatar from 'components/common/Avatar'
import Pubkey from 'components/common/Pubkey'
import Bio from 'components/common/Bio'

class ShowProfile extends Component {

  props: {
    profile: Profile,
    onLogoutClick: () => any,
    onEditClick: () => any
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

        <Bio bio={profile.bio} />

        <Typography align="center" type="body2">
          Share your Arbore ID
        </Typography>
        <Pubkey pubkey={profile.pubkey} />

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
