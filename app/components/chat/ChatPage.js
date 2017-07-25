// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import RoomList from 'containers/chat/RoomList'
import Room from 'containers/chat/Room'
import ContactList from 'models/ContactList'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

class ChatPage extends Component {

  props: {
    contacts: ContactList,
    onGoToContactClick: () => any,
  }

  render() {
    const { classes, contacts } = this.props

    if(contacts.directory.count() <= 0) {
      return (
        <div className={classes.noContact}>
          <Typography type="subheading">Ho no !</Typography>
          <Typography>It seems that you have no contact yet.</Typography>
          <div className={classes.spacer} />
          <Button raised color='primary' onClick={this.props.onGoToContactClick}>Go to the contact management</Button>
        </div>
      )
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <div className={classes.scrollerContact}>
            <RoomList />
          </div>
        </div>
        <Room />
      </div>
    )
  }
}

const styleSheet = createStyleSheet('ChatPage', theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    height: '100vh',
  },
  contacts: {
    flexDirection: 'column',
    width: 200,
    margin: 4,
    overflow: 'hidden'
  },
  scrollerContact: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
    padding: 3,
  },
  noContact: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    height: 30,
  }
}))

export default withStyles(styleSheet)(ChatPage)
