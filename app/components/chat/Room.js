// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import ChatRoom from 'models/ChatRoom'
import HistoryChunk from 'components/chat/HistoryChunk'
import ContactList from 'models/ContactList'
import Profile from 'models/Profile'
import Avatar from 'components/common/Avatar'

class Room extends Component {

  props: {
    selectedRoom: ?ChatRoom,
    contacts: ContactList,
    profile: Profile,
    promptValue: string,
    onPromptKeyDown: (any) => any,
    onPromptChange: (any) => any,
  }

  scrollToBottom() {
    if(!this.bottom) {
      return
    }

    this.bottom.scrollIntoView({block: "end", behavior: "smooth"});
  }

  render() {
    const { classes, selectedRoom, contacts, profile } = this.props

    if(!selectedRoom) {
      return (
        <div className={classes.chat}> </div>
      )
    }

    const history = selectedRoom.chunks.map((chunk, index) =>
      <HistoryChunk
        key={index}
        chunk={chunk}
        person={chunk[0].contactPubkey ? contacts.findContactInDirectory(chunk[0].contactPubkey) : profile}
      />
    )

    return (
      <div className={classes.chat}>
        <div className={classes.scroller}>
          <div className={classes.history}>
            { history }
            <div ref={(bottom) => { this.bottom = bottom }} > </div>
          </div>
        </div>
        <div className={classes.prompt}>
          <Avatar person={profile} className={classes.promptAvatar} />
          <TextField
            label='Write something'
            className={classes.promptInput}
            onKeyDown={this.props.onPromptKeyDown}
            onChange={this.props.onPromptChange}
            value={this.props.promptValue}
          />
        </div>
      </div>
    )
  }
}

const styleSheet = createStyleSheet('Room', theme => ({
  chat: {
    flexDirection: 'column',
    flex: 1,
    /*
     * This is hacky, the goal is to avoid the scroller to overflow in the bottom
     * because of the search bar and the .scroller { height: 100% }
     */
    paddingBottom: 50,
    backgroundColor: theme.palette.background.appBar,
  },
  scroller: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  history: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    minHeight: '100%',
    padding: '0 10px 5px',
  },
  prompt: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 10px 0',
  },
  promptAvatar: {
    width: '42px !important',
    height: '42px !important',
    marginRight: 10,
  },
  promptInput: {
    flex: 1
  },
}))

export default withStyles(styleSheet)(Room)
