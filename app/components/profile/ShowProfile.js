// @flow
import React, { Component } from 'react'
import Profile from 'models/Profile'
import styles from './ShowProfile.css'
import { Avatar, Button, Typography } from 'material-ui'
import FontAwesome from 'react-fontawesome'

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
          ? <Avatar src={profile.avatarUrl} className={styles.avatar} />
          : <div className={styles.noAvatar}><Typography>No avatar</Typography></div>
        }

        { profile.bio
          ? <Typography paragraph className={styles.bio}>{profile.bio}</Typography>
          : <Typography paragraph className={styles.bioEmpty}>Write something about you</Typography>
        }

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
