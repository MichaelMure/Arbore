// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewProfile from 'components/profile/NewProfile'
import * as profile from 'actions/profile'
import Identity from 'models/Identity'

class NewProfileContainer extends Component {
  newProfile: NewProfile

  state = {
    waiting: false
  }

  props: {
    forbiddenIdentities: string[],
    showIdentityList: () => any,
    dispatch: (action) => any
  }

  handleSubmit(values) {
    console.log(values)

    this.setState({ waiting: true })

    this.props.dispatch(profile.generateProfile(values.identity, values.passphrase, values.bio, values.avatar))
      .then(() => this.props.showIdentityList())
      .then(() => this.setState({ waiting: false }))
      .catch(err => {
        this.setState({ waiting: false })
        // TODO: do something with the error
        console.log(err)
      })
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
        forbiddenIdentities={this.props.forbiddenIdentities}
        onCancelClick={::this.handleCancel}
        waiting={this.state.waiting}
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
