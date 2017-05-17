// @flow
import React, { Component } from 'react'
import MUIAvatar from 'material-ui/Avatar'
import Profile from 'models/Profile'
import Contact from 'models/Contact'
import Identity from 'models/Identity'

class Avatar extends Component {

  props: {
    person: Profile|Contact|Identity,
  }

  render() {
    const { person, ...extra } = this.props

    if(person.avatarUrl) {
      return <MUIAvatar {...extra} src={person.avatarUrl} alt={person.identity} />
    } else {
      return <MUIAvatar {...extra} alt={person.identity}>{person.initials}</MUIAvatar>
    }
  }
}

export default Avatar
