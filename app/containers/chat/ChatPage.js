// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Store } from 'utils/types'
import ChatPage from 'components/chat/ChatPage'
import Profile from 'models/Profile'
import ContactList from 'models/ContactList'
import * as chat from 'actions/chat'
import type {Action} from 'utils/types'

class ChatPageContainer extends Component {
  chatPage: ChatPage

  props: {
    profile: Profile,
    contacts: ContactList,
    dispatch: (Action) => any
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
    if(event.keyCode === 13) {
      this.props.dispatch(chat.sendChat(
        this.props.contacts.findContact('blj'),
        this.state.promptValue)
      )
      this.setState({ promptValue: ''})
    }
  }

  render() {
    return (
      <ChatPage
        ref={(chatPage) => { this.chatPage = chatPage }}
        promptValue={this.state.promptValue}
        onPromptKeyDown={::this.handlePromptKeyDown}
        onPromptChange={::this.handlePromptChange}
        { ...this.props}
      />
    )
  }
}

const mapStateToProps = (state: Store) => ({
  profile: state.profile,
  contacts: state.contactList
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatPageContainer)
