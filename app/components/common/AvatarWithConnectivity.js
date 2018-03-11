// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Profile, { ConnectivityStatus } from 'models/Profile'
import type { ConnectivityStatusType } from 'models/Profile'
import Avatar from 'components/common/Avatar'
import classNames from 'classnames'

class AvatarWithConnectivity extends Component {

  props: {
    profile: Profile,
  }

  static defaultProps = {
    rootClass: '',
    avatarClass: ''
  }

  render() {
    const { classes, profile, avatarClass } = this.props
    const status: ConnectivityStatusType = profile.connectivityStatus

    const statusClass = classNames({
      [classes.good]:    status === ConnectivityStatus.GOOD,
      [classes.warning]: status === ConnectivityStatus.WARNING,
      [classes.bad]:     status === ConnectivityStatus.BAD,
    })

    return (
      <div className={classes.wrapper + ' ' + statusClass}>
        <Avatar person={profile} className={avatarClass} />
      </div>
    )
  }
}

const style = theme => ({
  wrapper: {
    padding: 2,
    borderRadius: '50%',
  },
  good: {
    backgroundColor: '#00d300',
  },
  warning: {
    backgroundColor: '#d37a1e',
  },
  bad: {
    backgroundColor: '#a82a36',
  }
})

export default withStyles(style)(AvatarWithConnectivity)
