// @flow
import React, { Component } from 'react'
import styles from './Profile.css'
import Profile from 'models/Profile'
import Input from 'material-ui/Input'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'



class ProfileEdit extends Component {

  props : {
    profile: Profile,
    onTest: () => void,
    onAvatarChange: (Buffer) => () => void,
    onLogoutClick: () => void
  }


  render() {
    const profile = this.props.profile
    return (
      <div>
        <Button onClick={this.props.onLogoutClick }>Logout</Button>

        <Typography>Profile</Typography>
        <Avatar
          src={profile.avatarData}
          className={styles.avatar}
        />

        <Button onClick={this.props.onTest}>TEST</Button>
      </div>
    );
  }
}

export default ProfileEdit;
