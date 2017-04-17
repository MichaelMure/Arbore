// @flow
import { connect } from 'react-redux'
import { Store } from 'utils/types'
import ContactPage from 'components/contact/ContactPage'

const mapStateToProps = (state: Store) => ({
  contacts: state.contactList
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)
