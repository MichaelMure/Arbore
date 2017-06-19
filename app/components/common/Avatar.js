// @flow
import React, { Component } from 'react'
import MUIAvatar from 'material-ui/Avatar'
import Profile from 'models/Profile'
import Contact from 'models/Contact'
import Identity from 'models/Identity'

class Avatar extends Component {

  props: {
    person: Profile|Contact|Identity|null,
  }

  render() {
    const { person, ...extra } = this.props

    if(!person) {
      return <MUIAvatar
        {...extra}
        style={{ pointerEvents: 'none'}}
        alt='Unknow'
      >?</MUIAvatar>
    }

    if(person.avatarUrl) {
      return <MUIAvatar
        {...extra}
        src={person.avatarUrl}
        alt={person.identity}
        style={{ pointerEvents: 'none'}}
      />
    } else {
      return <MUIAvatar {...extra} alt={person.identity}>{person.initials}</MUIAvatar>
    }
  }
}

export default Avatar
