// @flow
import { connect } from 'react-redux'
import * as contact from 'actions/contact'
import type { Store } from 'utils/types'
import ContactDetail from 'components/contact/ContactDetail'

const mapStateToProps = (state: Store) => ({
  contact: state.contactList.selected
})

const mapDispatchToProps = dispatch => ({
  // onFavoriteClickGenerator: (share: Share) => (
  //   () => (dispatch(shareActions.toggleFavorite(share.id)))
  // ),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetail)
