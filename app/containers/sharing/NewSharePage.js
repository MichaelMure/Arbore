// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewShare, { formName } from 'components/sharing/NewShare'
import { Store } from 'utils/types'
import type {Action} from 'utils/types'
import ContactList from 'models/ContactList'
import * as ui from 'actions/ui'
import {reset} from 'redux-form'

/**
 * Container around the new Share form
 */
class NewShareContainer extends Component {
  state = {
    waiting: false
  }

  props: {
    contactList: ContactList,
    dispatch: (Action) => any
  }

  async handleSubmit(values) {
    const dispatch = this.props.dispatch
    console.log(values)
    this.setState({ waiting: true })

    try {

      this.setState({ waiting: false })
      dispatch(ui.closeNewShare())
    } catch(err) {
      this.setState({ waiting: false })
      // TODO: do something with the error
      console.log(err)
    }
  }

  // Intercept the cancel click to reset the form
  handleCancel() {
    const { dispatch } = this.props

    dispatch(ui.closeNewShare())

    // Wait for the end of the UI animation
    setTimeout(() => { dispatch(reset(formName)) }, 1000)
  }

  render() {
    return (
      <NewShare
        onSubmit={::this.handleSubmit}
        onCancelClick={::this.handleCancel}
        waiting={this.state.waiting}
        { ...this.props }
      />
    )
  }
}


const mapStateToProps = (state: Store) => ({
  contactList: state.contactList
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(NewShareContainer)
