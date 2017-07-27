// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Store } from 'utils/types'
import Room from 'components/chat/Room'
import Profile from 'models/Profile'
import * as chat from 'actions/chat'
import type {Action} from 'utils/types'
import ContactList from 'models/ContactList'
import UiState from 'models/UiState'
import ChatRoomList from 'models/ChatRoomList'

class RoomContainer extends Component {
  room: Room

  props: {
    dispatch: (Action) => any,
    profile: Profile,
    contacts: ContactList,
    chatRoomList: ChatRoomList,
    ui: UiState,
  }

  constructor(props) {
    super(props)
    this.state = {
      promptValue: ''
    }
  }

  handlePromptChange(event) {
    this.setState({ promptValue: event.target.value });
  }

  handlePromptKeyDown(event) {
    const { contacts, ui } = this.props

    if(event.keyCode === 13 && this.state.promptValue !== '') {
      this.props.dispatch(chat.sendChat(
        contacts.findContactInDirectory(ui.selectedChat),
        this.state.promptValue
      ))
      this.setState({ promptValue: ''})
    }
  }

  componentDidMount() {
    if(this.room) {
      this.room.scrollToBottom()
    }
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    const { ui, chatRoomList } = this.props

    if(!ui.selectedChat) {
      return
    }

    if(chatRoomList !== prevProps.chatRoomList && this.room) {
      this.room.scrollToBottom()
    }
  }

  render() {
    const { profile, contacts, chatRoomList, ui } = this.props

    return (
      <Room
        ref={(room) => { this.room = room ? room.innerRef : room }}
        selectedRoom={ui.selectedChat ? chatRoomList.findRoom(ui.selectedChat) : null}
        contacts={contacts}
        profile={profile}
        promptValue={this.state.promptValue}
        onPromptKeyDown={::this.handlePromptKeyDown}
        onPromptChange={::this.handlePromptChange}
      />
    )
  }
}

const mapStateToProps = (state: Store) => ({
  profile: state.profile,
  contacts: state.contactList,
  chatRoomList: state.chatRoomList,
  ui: state.ui,
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer)
