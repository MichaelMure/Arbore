// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import type {Action} from 'utils/types'
import SelectIdentity from 'components/login/SelectIdentity'
import { formName }from 'components/login/IdentityPrompt'
import IdentityList from 'models/IdentityList'
import Identity from 'models/Identity'
import { reset } from 'redux-form'

class SelectIdentityContainer extends Component {

  props: {
    identities: IdentityList,
    dispatch: (Action) => any,
    onNewIdentityClick: () => any,
  }

  constructor(props) {
    super(props)
    this.state = {
      active: null,
      open: false,
    }
  }

  handleNameClick(identity: Identity) {
    if(identity !== this.state.active) {
      this.setState({active: identity, open: true})
      this.props.dispatch(reset(formName))
    }
  }

  handleSubmit(identity: Identity) {
    this.setState({active: identity, open: identity.hasPassword})
    this.props.dispatch(reset(formName))
  }

  render() {
    return (
      <SelectIdentity
        identities={this.props.identities}
        onNewIdentityClick={this.props.onNewIdentityClick}
        active={this.state.active}
        open={this.state.open}
        onNameClick={::this.handleNameClick}
        onSubmit={::this.handleSubmit}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  identities: state.identityList,
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectIdentityContainer)

