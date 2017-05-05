// @flow
import React, { Component } from 'react'
import EditProfile from 'containers/profile/EditProfile'
import ShowProfile from 'containers/profile/ShowProfile'

class ProfilePage extends Component {

  state = {
    editing: false,
  }

  editProfile() {
    this.setState({
      editing: true
    })
  }

  cancelEditProfile() {
    this.setState({
      editing: false
    })
  }

  render() {
    return this.state.editing
      ? <EditProfile onCancelClick={::this.cancelEditProfile} onDone={::this.cancelEditProfile}/>
      : <ShowProfile onEditClick={::this.editProfile}/>
  }
}

export default ProfilePage
