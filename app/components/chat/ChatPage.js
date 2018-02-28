// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import SecondaryMenu from 'containers/menu/SecondaryMenu'
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
    const { classes, contacts, onGoToContactClick } = this.props

    if(contacts.directory.count() <= 0) {
      return (
        <div className={classes.wrapper}>
          <div />
          <SecondaryMenu />

          <div className={classes.noContact}>
            <Typography type="subheading">Ho no !</Typography>
            <Typography>It seems that you have no contact yet.</Typography>
            <div className={classes.spacer} />
              <Button variant='raised' color='primary' onClick={onGoToContactClick}>Go to the contact management</Button>
          </div>
        </div>
      )
    }

    return (
      <div className={classes.wrapper}>

        <SecondaryMenu/>

        <div className={classes.contacts}>
          <RoomList />
        </div>

        <Room />
      </div>
    )
  }
}

const style = theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gridTemplateRows: 'auto 1fr',
    height: '100vh',
    backgroundColor: theme.palette.background.dark,
  },
  contacts: {
    backgroundColor: theme.palette.background.main,
    gridRow: '1 / 3',
    overflow: 'auto',
    padding: 10,
  },
  noContact: {
    backgroundColor: theme.palette.background.main,
    gridColumn: '1 / 3',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    height: 30,
  }
})

export default withStyles(style)(ChatPage)
