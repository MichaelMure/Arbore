// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Profile from 'models/Profile'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import classnames from 'classnames'

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
          { profile.avatarUrl && <Avatar src={profile.avatarUrl} /> }
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
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& > p': {
      paddingRight: 14,
    }
  },
  identity: {
    fontSize: '1.2em !important',
  },
})

export default withStyles(style)(SecondaryMenu)
