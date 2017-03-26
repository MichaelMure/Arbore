// @flow
import { connect } from 'react-redux'
import * as profile from '../actions/profile'
import * as ui from '../actions/ui'

import Profile from '../components/Profile'
import { Store } from '../utils/types'


const mapStateToProps = (state: Store) => ({
  open: state.ui.profileOpen
})

const mapDispatchToProps = dispatch => ({
  onBackgroundClick: () => { dispatch(ui.toggleProfile()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
