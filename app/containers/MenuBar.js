// @flow
import { connect } from 'react-redux'
import * as ui from '../actions/ui'

import MenuBar from '../components/MenuBar'
import { Store } from '../utils/types'


const mapStateToProps = (state: Store) => ({
})

const mapDispatchToProps = dispatch => ({
  onProfileClick: () => { dispatch(ui.toggleProfile()) },
})

export default connect(null, mapDispatchToProps)(MenuBar)
