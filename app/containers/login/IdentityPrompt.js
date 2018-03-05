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
    active: boolean,
    open: boolean,
    dispatch: (Action) => any,
    onNameClick: () => any,
    onSubmit: (identity: Identity) => any,
  }

  async handleSubmit(values) {
    const { dispatch, identity } = this.props
    const { password } = values

    this.props.onSubmit(identity)

    try {
      await dispatch(identyListActions.login(identity, password))
    } catch(err) {
      throw new SubmissionError({ _error: err })
    }
  }

  render() {
    return (
      <IdentityPrompt
        identity={this.props.identity}
        active={this.props.active}
        open={this.props.open}
        onNameClick={this.props.onNameClick}
        onSubmit={::this.handleSubmit}
      />
    )
  }
}

export default connect()(IdentityPromptContainer)
