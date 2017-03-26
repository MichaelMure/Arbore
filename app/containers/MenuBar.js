// @flow
import { connect } from 'react-redux'
import * as ui from '../actions/ui'
import * as sharelist from '../actions/shareList'
import { ShareListFilter } from '../models/ShareList'

import MenuBar from '../components/MenuBar'
import { Store } from '../utils/types'


const mapStateToProps = (state: Store) => ({
})

const mapDispatchToProps = dispatch => ({
  onProfileClick: () => { dispatch(ui.toggleProfile()) },
  onFavoriteClick: () => { dispatch(sharelist.setFilter(ShareListFilter.FAV)) }
})

export default connect(null, mapDispatchToProps)(MenuBar)
