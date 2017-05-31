// @flow
import React from 'react'
import { connect } from 'react-redux'
import type { Store } from 'utils/types'
import AddBySuggest from 'components/contact/AddBySuggest'
import * as contactList from 'actions/contactList'
import * as contactPool from 'actions/contactPool'
import Contact from 'models/Contact'

const mapStateToProps = (state: Store) => ({
  suggestion: state.contactPool.suggest(state.contactList, 6)
})

const mapDispatchToProps = dispatch => ({
  onSuggestAcceptGenerator: (contact: Contact) => () => { dispatch(contactList.addContact(contact.pubkey)) },
  onSuggestRefuseGenerator: (contact: Contact) => () => { dispatch(contactPool.rejectSuggestion(contact)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBySuggest)
