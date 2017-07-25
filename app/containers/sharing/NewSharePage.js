// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewShare, { formName } from 'components/sharing/NewShare'
import { Store } from 'utils/types'
import * as uiActions from 'actions/ui'
import * as shareActions from 'actions/share'
import {reset, SubmissionError} from 'redux-form'
import { Page } from 'models/UiState'

class NewSharePage extends Component {

  props: {
    dispatch: (any) => any
  }

  state = {
    progress: null
  }

  async handleSubmit(values) {
    const { dispatch } = this.props

    try {
      const progressGen = dispatch(shareActions.create(
        values.title,
        values.description || '',
        values.recipients,
        values.content
      ))

      for await (const progress of progressGen) {
        this.setState({progress})
      }

      this.setState({progress: null})

      dispatch(uiActions.setPage(Page.SHARING))
      dispatch(uiActions.closeNewShare())
      // Wait for the end of the UI animation
      setTimeout(() => { dispatch(reset(formName)) }, 500)
    } catch(err) {
      console.log(err)
      throw new SubmissionError({ _error: err })
    }
  }

  render() {
    return (
      <NewShare
        onSubmit={::this.handleSubmit}
        progress={this.state.progress}
        { ...this.props }
      />
    )
  }
}

const mapStateToProps = (state: Store) => ({
  contactList: state.contactList
})

const mapDispatchToProps = dispatch => ({
  dispatch,

  onCancelClick: () => {
    dispatch(uiActions.closeNewShare())

    // Wait for the end of the UI animation
    setTimeout(() => { dispatch(reset(formName)) }, 500)
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(NewSharePage)
