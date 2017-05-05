// @flow
import { connect } from 'react-redux'
import { Store } from 'utils/types'
import ShowProfile from 'components/profile/ShowProfile'
import * as identityList from 'actions/identityList'

const mapStateToProps = (state: Store) => ({
  profile: state.profile,
})

const mapDispatchToProps = dispatch => ({
  onLogoutClick: () => { dispatch(identityList.logout()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowProfile)
