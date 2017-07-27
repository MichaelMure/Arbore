// @flow
import { connect } from 'react-redux'
import * as contactActions from 'actions/contact'
import * as contactListActions from 'actions/contactList'
import type { Store } from 'utils/types'
import ContactDetail from 'components/contact/ContactDetail'
import Contact from 'models/Contact'

const mapStateToProps = (state: Store) => ({
  contact: state.contactList.selected,
  isInDirectory: state.contactList.selectedInDirectory(),
})

const mapDispatchToProps = dispatch => ({
  onPrivacyChange: (contact: Contact, hidden: boolean) => (
    dispatch(contactActions.setPrivacy(contact.pubkey, hidden))
  ),
  onDeleteClickGenerator: (contact: Contact) => () => (
    dispatch(contactListActions.removeContact(contact))
  ),
  onAddClickGenerator: (contact: Contact) => () => {
    dispatch(contactListActions.addContactInDirectory(contact.pubkey))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetail)
