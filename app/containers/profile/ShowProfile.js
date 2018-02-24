// @flow
import { connect } from 'react-redux'
import { Store } from 'utils/types'
import ShowProfile from 'components/profile/ShowProfile'

const mapStateToProps = (state: Store) => ({
  profile: state.profile,
})

export default connect(mapStateToProps)(ShowProfile)
