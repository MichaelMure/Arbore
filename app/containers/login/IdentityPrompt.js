// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import type {Action} from 'utils/types'
import IdentityPrompt from 'components/login/IdentityPrompt'
import Identity from 'models/Identity'
import * as identyListActions from 'actions/identityList'
import { SubmissionError } from 'redux-form'

class IdentityPromptContainer extends Component {

  props: {
    identity: Identity,
    open: boolean,
    dispatch: (Action) => any,
    onNameClick: () => any,
    onFinish: () => any,
  }

  async handleSubmit(values) {
    const { dispatch, identity } = this.props
    const { password } = values

    try {
      await dispatch(identyListActions.login(identity))
      this.props.onFinish()
    } catch(err) {
      throw new SubmissionError({ _error: err })
    }
  }

  render() {
    return (
      <IdentityPrompt
        identity={this.props.identity}
        open={this.props.open}
        onNameClick={this.props.onNameClick}
        onSubmit={::this.handleSubmit}
        onPasswordBlur={this.props.onFinish}
      />
    )
  }
}

export default connect()(IdentityPromptContainer)
