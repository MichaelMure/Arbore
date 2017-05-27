// @flow
import React from 'react'
import { connect } from 'react-redux'
import type { Store } from 'utils/types'
import AddBySuggest from 'components/contact/AddBySuggest'

const mapStateToProps = (state: Store) => ({
  suggestion: state.contactPool.suggest(state.contactList, 6)
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBySuggest)
