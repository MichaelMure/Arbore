// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Profile from 'models/Profile'
import Avatar from 'material-ui/Avatar'
import FontAwesome from 'react-fontawesome'

class SecondaryMenu extends Component {

  props: {
    profile: Profile,
    profileSelected: boolean,
    onProfileClick: () => void,
  }

  render() {
    const profile : Profile = this.props.profile
    const { classes, onProfileClick } = this.props

    return (
      <div className={classes.wrapper}>
        <div className={classes.item} onClick={onProfileClick}>
          { profile.avatarUrl
            ? <Avatar src={profile.avatarUrl} />
            : <FontAwesome name='user-circle-o' className={classes.profile} />
          }
        </div>
      </div>
    )
  }
}

const style = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
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
