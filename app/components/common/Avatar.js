// @flow
import React, { Component } from 'react'
import MUIAvatar from 'material-ui/Avatar'
import Profile from 'models/Profile'
import Contact from 'models/Contact'
import Identity from 'models/Identity'

/**
 * Component that encapsulate Material-ui's Avatar component to render properly
 * any type of person we can have. If passed null, it render an 'unknow' person.
 */
class Avatar extends Component {

  props: {
    person: Profile|Contact|Identity|null,
  }

  render() {
    const { person, ...extra } = this.props

    if(!person) {
      return <MUIAvatar
        {...extra}
        alt='Unknow'
      >?</MUIAvatar>
    }

    if(person.avatarUrl) {
      return <MUIAvatar
        {...extra}
        src={person.avatarUrl}
        alt={person.identity}
      />
    } else {
      return <MUIAvatar {...extra} alt={person.identity}>{person.initials}</MUIAvatar>
    }
  }
}

export default Avatar
