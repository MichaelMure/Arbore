// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'
import Profile from 'models/Profile'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import AvatarWithConnectivity from 'components/common/AvatarWithConnectivity'

import Logout from 'react-feather/dist/icons/log-out'

class SecondaryMenu extends Component {

  props: {
    profile: Profile,
    onProfileClick: () => void,
    onLogoutClick: () => void,
    className: any,
  }

  render() {
    const profile : Profile = this.props.profile
    const { classes, className, onProfileClick, onLogoutClick } = this.props

    return (
      <div className={classnames(classes.wrapper, className)}>
        <div className={classes.item} onClick={onProfileClick}>
          <Typography noWrap className={classes.identity}>{profile.identity}</Typography>
          <AvatarWithConnectivity profile={profile} />
        </div>
        <IconButton onClick={onLogoutClick}>
          <Logout/>
        </IconButton>
      </div>
    )
  }
}

const style = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    height: 60,
    backgroundColor: theme.palette.background.dark,
    overflow: 'hidden',
  },
  item: {
    display: 'flex',
    minWidth: 0,
    alignItems: 'center',
    cursor: 'pointer',
    '& > p': {
      paddingRight: 14,
    },
  },
  identity: {
    fontSize: '1.2em !important',
  },
})

export default withStyles(style)(SecondaryMenu)
