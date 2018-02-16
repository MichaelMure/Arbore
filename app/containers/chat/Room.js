// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Store } from 'utils/types'
import Room from 'components/chat/Room'
import Profile from 'models/Profile'
import * as chat from 'actions/chat'
import type {Action} from 'utils/types'
import ContactList from 'models/ContactList'
import ChatRoomList from 'models/ChatRoomList'

class RoomContainer extends Component {
  room: Room

  props: {
    dispatch: (Action) => any,
    profile: Profile,
    contacts: ContactList,
    chatRoomList: ChatRoomList,
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
    const { contacts, chatRoomList } = this.props

    if(event.keyCode === 13 && this.state.promptValue !== '') {
      this.props.dispatch(chat.sendChat(
        contacts.findContactInDirectory(chatRoomList.selectedChat),
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
    const { chatRoomList } = this.props

    if(!chatRoomList.selectedChat) {
      return
    }

    if(chatRoomList !== prevProps.chatRoomList && this.room) {
      this.room.scrollToBottom()
    }
  }

  render() {
    const { profile, contacts, chatRoomList } = this.props

    return (
      <Room
        ref={(room) => { this.room = room ? room.innerRef : room }}
        selectedRoom={chatRoomList.selected}
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
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer)
