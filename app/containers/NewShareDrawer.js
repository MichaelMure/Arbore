// @flow
import { connect } from 'react-redux'
import * as ui from 'actions/ui'

import Drawer from 'components/Drawer'
import { Store } from 'utils/types'


const mapStateToProps = (state: Store) => ({
  open: state.ui.newShareOpen,
  big: true
})

const mapDispatchToProps = dispatch => ({
  onBackgroundClick: () => { dispatch(ui.toggleNewShare()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
