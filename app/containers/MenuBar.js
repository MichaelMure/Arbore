// @flow
import { connect } from 'react-redux'
import * as ui from '../actions/ui'
import * as sharelist from '../actions/shareList'
import { ShareListFilter } from '../models/ShareList'

import MenuBar from '../components/MenuBar'
import { Store } from '../utils/types'


const mapStateToProps = (state: Store) => ({
  available: state.shareList.available,
  inbox: state.shareList.inbox,
  active: state.shareList.active,
  sharing: state.shareList.sharing,
  favorite: state.shareList.favorite,
})

const mapDispatchToProps = dispatch => ({
  onProfileClick:   () => { dispatch(ui.toggleProfile()) },
  onAvailableClick: () => { dispatch(sharelist.setFilter(ShareListFilter.AVAILABLE)) },
  onInboxClick:     () => { dispatch(sharelist.setFilter(ShareListFilter.INBOX)) },
  onActiveClick:    () => { dispatch(sharelist.setFilter(ShareListFilter.ACTIVE)) },
  onSharingClick:   () => { dispatch(sharelist.setFilter(ShareListFilter.SHARING)) },
  onFavoriteClick:  () => { dispatch(sharelist.setFilter(ShareListFilter.FAV)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
