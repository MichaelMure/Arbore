// @flow
import { connect } from 'react-redux'
import { Store } from 'utils/types'
import SharingPage from 'components/sharing/SharingPage'
import * as sharelist from 'actions/shareList'

const mapStateToProps = (state: Store) => ({
  shareList: state.shareList,
  contactPool: state.contactPool,
  profile: state.profile
})

const mapDispatchToProps = dispatch => ({
  onClickGenerator: (index) => (
    () => (dispatch(sharelist.setSelected(index)))
  ),
  onSearchChange: (event) => {
    dispatch(sharelist.setSearch(event.target.value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SharingPage)
