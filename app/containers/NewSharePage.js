// @flow
import { connect } from 'react-redux'

import NewShare from 'components/sharing/NewShare'
import { Store } from 'utils/types'

const mapStateToProps = (state: Store) => ({
  contactList: state.contactList
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(NewShare)
