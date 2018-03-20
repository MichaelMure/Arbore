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
    swarmCount: ?number,
    onMouseEnter: () => any,
  }

  render() {
    const { classes, swarmCount, profile, onMouseEnter } = this.props
    const status: ConnectivityStatusType = profile.connectivityStatus

    const statusClass = classNames({
      [classes.good]:    status === ConnectivityStatus.GOOD,
      [classes.warning]: status === ConnectivityStatus.WARNING,
      [classes.bad]:     status === ConnectivityStatus.BAD,
    })

    const swarmTooltip = <span><br/>{ swarmCount } { swarmCount > 1 ? 'peers' : 'peer' } connected</span>

    const tooltip = <span>
      Profile published <Moment fromNow>{profile.lastPublished}</Moment>
      { swarmCount !== null && swarmTooltip}
    </span>

    return (
      <Tooltip id='connectivity' title={tooltip}>
        <div className={classes.wrapper + ' ' + statusClass} onMouseEnter={onMouseEnter}>
          <Avatar person={profile} />
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
