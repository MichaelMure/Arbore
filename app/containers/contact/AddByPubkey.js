// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { Store } from 'utils/types'
import type {Action} from 'utils/types'
import AddByPubkey from 'components/contact/AddByPubkey'
import * as contactList from 'actions/contactList'

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
      await dispatch(contactList.addContact(pubkey))
      this.setState({ waiting: false })
      this.props.onCancelClick()
    } catch(err) {
      this.setState({ waiting: false })
      // TODO: do something with the error
      console.log(err)
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

const mapStateToProps = (state: Store) => ({
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(AddByPubkeyContainer)
