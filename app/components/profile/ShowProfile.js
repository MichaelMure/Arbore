// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Profile from 'models/Profile'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import FontAwesome from 'react-fontawesome'
import Avatar from 'components/common/Avatar'
import Pubkey from 'components/common/Pubkey'
import InsetText from 'components/common/InsetText'

class ShowProfile extends Component {

  props: {
    profile: Profile,
    onEditClick: () => any
  }

  render() {
    const { classes, profile } = this.props

    return (
      <div>
        <div className={classes.header}>
          <div className={classes.lateral} />
          <Typography className={classes.identity}>{profile.identity}</Typography>
          <IconButton className={classes.lateral} onClick={this.props.onEditClick}><FontAwesome name="pencil" /></IconButton>
        </div>

        { profile.avatarUrl
          ? <Avatar person={profile} className={classes.avatar} />
          : <div className={classes.noAvatar}><Typography>No avatar</Typography></div>
        }

        <InsetText text={profile.bio} placeholder='No biography' />

        <Typography align="center" variant="body2">
          Share your Arbore ID
        </Typography>
        <Pubkey pubkey={profile.pubkey} />
      </div>
    )
  }
}

const style = theme => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '10px 0 20px',
  },
  avatar: {
    width: '200px !important',
    height: '200px !important',
    margin: 'auto',
    userSelect: 'none',
    pointerEvents: 'none',
  },
  noAvatar: {
    width: 200,
    height: 200,
    borderRadius: '50%',
    backgroundColor: theme.palette.background.dark,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  identity: {
    margin: '0 10px 0 !important',
    fontSize: '2em !important',
    textAlign: 'center',
    flexGrow: 1,
  },
  lateral: {
    width: '20px !important',
  },
})

export default withStyles(style)(ShowProfile)
