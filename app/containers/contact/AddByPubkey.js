// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import type {Action} from 'utils/types'
import AddByPubkey from 'components/contact/AddByPubkey'
import * as contactList from 'actions/contactList'
import { SubmissionError } from 'redux-form'

class AddByPubkeyContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      waiting: false
    }
  }

  props: {
    onCancelClick: () => any,
    dispatch: (Action) => any
  }


  async handleSubmit(values) {
    const dispatch = this.props.dispatch
    const { pubkey } = values

    this.setState({ waiting: true })

    try {
      await dispatch(contactList.addContactInDirectory(pubkey.trim()))
      this.setState({ waiting: false })
      this.props.onCancelClick()
    } catch(err) {
      this.setState({ waiting: false })
      throw new SubmissionError({ _error: err })
    }
  }

  render() {
    return (
      <AddByPubkey
        onSubmit={::this.handleSubmit}
        waiting={this.state.waiting}
        { ...this.props }
      />
    )
  }
}

export default connect()(AddByPubkeyContainer)
