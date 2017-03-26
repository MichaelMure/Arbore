// @flow
import { connect } from 'react-redux'
import * as ui from '../actions/ui'

import Drawer from '../components/Drawer'
import { Store } from '../utils/types'


const mapStateToProps = (state: Store) => ({
  open: state.ui.profileOpen
})

const mapDispatchToProps = dispatch => ({
  onBackgroundClick: () => { dispatch(ui.toggleProfile()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
