// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Profile from 'models/Profile'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import FontAwesome from 'react-fontawesome'
import Avatar from 'components/common/Avatar'
import Pubkey from 'components/common/Pubkey'
import InsetText from 'components/common/InsetText'

class ShowProfile extends Component {

  props: {
    profile: Profile,
    onLogoutClick: () => any,
    onEditClick: () => any
  }

  render() {
    const { classes, profile } = this.props

    return (
      <div>
        <Typography className={classes.identity}>{profile.identity}</Typography>

        { profile.avatarUrl
          ? <Avatar person={profile} className={classes.avatar} />
          : <div className={classes.noAvatar}><Typography>No avatar</Typography></div>
        }

        <InsetText text={profile.bio} placeholder='No biography' />

        <Typography align="center" type="body2">
          Share your Arbore ID
        </Typography>
        <Pubkey pubkey={profile.pubkey} />

        <div className={classes.buttons}>
          <Button raised onClick={this.props.onEditClick}>
            <FontAwesome name="pencil" />
            Edit profile
          </Button>
          <Button raised color='primary' onClick={this.props.onLogoutClick}>Logout</Button>
        </div>
      </div>
    )
  }
}

const styleSheet = createStyleSheet('ShowProfile', theme => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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
    backgroundColor: theme.palette.background.appBar,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  identity: {
    margin: '10px 10px 20px !important',
    fontSize: '2em !important',
    textAlign: 'center'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '10px !important',
    '& > *': {
      minWidth: 100,
    }
  }
}))

export default withStyles(styleSheet)(ShowProfile)
