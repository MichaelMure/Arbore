// @flow
import { connect } from 'react-redux'
import type { Store } from 'utils/types'
import AddBySuggest from 'components/contact/AddBySuggest'
import * as contactList from 'actions/contactList'
import Contact from 'models/Contact'

const mapStateToProps = (state: Store) => ({
  suggestion: state.contactList.suggestForAdd(6)
})

const mapDispatchToProps = dispatch => ({
  onSuggestAcceptGenerator: (contact: Contact) => () => {
    dispatch(contactList.addContactInDirectory(contact.pubkey))
  },
  onSuggestRefuseGenerator: (contact: Contact) => () => {
    dispatch(contactList.rejectSuggestion(contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBySuggest)
