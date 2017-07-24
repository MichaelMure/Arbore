// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewProfile from 'components/profile/NewProfile'
import * as profile from 'actions/profile'
import Identity from 'models/Identity'
import type {Action} from 'utils/types'
import { SubmissionError } from 'redux-form'

/**
 * Container around the new Profile form
 */
class NewProfileContainer extends Component {
  newProfile: NewProfile

  state = {
    waiting: false
  }

  props: {
    forbiddenIdentities: string[],
    showIdentityList: () => any,
    dispatch: (Action) => any
  }

  async handleSubmit(values) {
    const dispatch = this.props.dispatch
    const { identity, bio, avatar, passphrase } = values

    this.setState({ waiting: true })

    try {
      await dispatch(profile.generate(identity, passphrase, bio, avatar))
      this.setState({ waiting: false })
      this.props.showIdentityList()
    } catch(err) {
      this.setState({ waiting: false })
      throw new SubmissionError({ _error: err })
    }
  }

  // Intercept the cancel click to reset the form
  handleCancel() {
    this.props.showIdentityList()

    // Wait for the end of the UI animation
    setTimeout(::this.newProfile.reset, 1000)
  }

  render() {
    return (
      <NewProfile
        ref={(newProfile) => { this.newProfile = newProfile; }}
        onSubmit={::this.handleSubmit}
        onCancelClick={::this.handleCancel}
        waiting={this.state.waiting}
        { ...this.props }
      />
    )
  }
}

const mapStateToProps = (state) => ({
  forbiddenIdentities: state.identityList.identities.valueSeq().map(
    (id: Identity) => id.identity
  ).toArray()
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(NewProfileContainer)
