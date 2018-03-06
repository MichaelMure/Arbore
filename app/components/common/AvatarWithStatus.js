// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Profile from 'models/Profile'
import Contact from 'models/Contact'
import Identity from 'models/Identity'
import { ContactStatus, ContactStatusType } from 'models/Contact'
import Avatar from 'components/common/Avatar'
import classNames from 'classnames'

class AvatarWithStatus extends Component {

  props: {
    person: Profile|Contact|Identity,
    status: ContactStatusType,
    rootClass: any,
    avatarClass: any
  }

  static defaultProps = {
    rootClass: '',
    avatarClass: ''
  }

  render() {
    const { classes, person, status, avatarClass, rootClass } = this.props

    const dotClass = classNames(classes.dot, {
      [classes.green]: status === ContactStatus.ONLINE,
      [classes.gray]: status === ContactStatus.OFFLINE,
    })

    return (
      <div className={classes.wrapper + ' ' + rootClass}>
        <Avatar person={person} className={avatarClass} />
        <div className={dotClass}/>
      </div>
    )
  }
}

const style = theme => ({
  wrapper: {
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    borderRadius: '50%',
    top: '5%',
    right: '5%',
    width: '25%',
    height: '25%',
  },
  green: {
    backgroundColor: '#00d300',
  },
  gray: {
    backgroundColor: '#a8a8a8',
  }
})

export default withStyles(style)(AvatarWithStatus)
