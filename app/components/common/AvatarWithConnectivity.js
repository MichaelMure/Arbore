// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import Tooltip from 'material-ui/Tooltip'
import Profile, { ConnectivityStatus } from 'models/Profile'
import type { ConnectivityStatusType } from 'models/Profile'
import Avatar from 'components/common/Avatar'
import Moment from 'react-moment'

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

    const tooltip = <span>Profile published <Moment fromNow>{profile.lastPublished}</Moment></span>

    return (
      <Tooltip id='connectivity' title={tooltip}>
        <div className={classes.wrapper + ' ' + statusClass}>
          <Avatar person={profile} className={avatarClass} />
        </div>
      </Tooltip>
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
