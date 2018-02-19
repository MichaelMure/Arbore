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
    dispatch: (Action) => any
  }

  constructor(props) {
    super(props)
    this.state = {
      opened: null
    }
  }

  handleIdentityClick(identity: Identity) {
    if(identity !== this.state.opened) {
      this.setState({opened: identity})
      this.props.dispatch(reset(formName))
    }
  }

  handleFinish() {
    this.props.dispatch(reset(formName))
  }

  render() {
    return (
      <SelectIdentity
        opened={this.state.opened}
        onIdentityClick={::this.handleIdentityClick}
        onFinish={::this.handleFinish}
        { ...this.props }
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

