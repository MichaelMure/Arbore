// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Profile from 'models/Profile'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import FontAwesome from 'react-fontawesome'

class SecondaryMenu extends Component {

  props: {
    profile: Profile,
    onProfileClick: () => void,
  }

  render() {
    const profile : Profile = this.props.profile
    const { classes, onProfileClick } = this.props

    return (
      <div className={classes.wrapper}>
        <div className={classes.item} onClick={onProfileClick}>
          <Typography noWrap>{profile.identity}</Typography>
          { profile.avatarUrl && <Avatar src={profile.avatarUrl} /> }
        </div>
      </div>
    )
  }
}

const style = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 10,
    height: 60,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& > p': {
      paddingRight: 14,
    }
  },
  profile: {
    fontSize: 40,
    userSelect: 'none',
  }
})

export default withStyles(style)(SecondaryMenu)
