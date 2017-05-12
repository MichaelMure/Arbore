// @flow
import { connect } from 'react-redux'
import { Store } from 'utils/types'
import ContactPage from 'components/contact/ContactPage'
import * as contactList from 'actions/contactList'

const mapStateToProps = (state: Store) => ({
  contacts: state.contactList
})

const mapDispatchToProps = dispatch => ({
  onClickGenerator: (pubkey) => (
    () => (dispatch(contactList.setSelected(pubkey)))
  ),
  onSearchChange: (event) => {
    dispatch(contactList.setSearch(event.target.value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)
