// @flow
import { connect } from 'react-redux'
import * as ui from 'actions/ui'
import * as sharelist from 'actions/shareList'
import { ShareListFilter } from 'models/ShareList'
import MenuBar from 'components/MenuBar'
import { Store } from 'utils/types'
import { Page } from 'models/UiState'


const mapStateToProps = (state: Store) => ({
  profile: state.profile,
  available: state.shareList.available,
  inbox: state.shareList.inbox,
  active: state.shareList.active,
  sharing: state.shareList.sharing,
  favorite: state.shareList.favorite,
})

const mapDispatchToProps = dispatch => ({
  onProfileClick:   () => { dispatch(ui.toggleProfile()) },
  onNewShareClick:  () => { dispatch(ui.toggleNewShare()) },
  onAvailableClick: () => { dispatch(sharelist.setFilter(ShareListFilter.AVAILABLE)); dispatch(ui.setPage(Page.SHARING)) },
  onInboxClick:     () => { dispatch(sharelist.setFilter(ShareListFilter.INBOX));     dispatch(ui.setPage(Page.SHARING)) },
  onActiveClick:    () => { dispatch(sharelist.setFilter(ShareListFilter.ACTIVE));    dispatch(ui.setPage(Page.SHARING)) },
  onSharingClick:   () => { dispatch(sharelist.setFilter(ShareListFilter.SHARING));   dispatch(ui.setPage(Page.SHARING)) },
  onFavoriteClick:  () => { dispatch(sharelist.setFilter(ShareListFilter.FAV));       dispatch(ui.setPage(Page.SHARING)) },
  onContactClick:   () => { dispatch(ui.setPage(Page.CONTACT)) },
  onChatClick:      () => { dispatch(ui.setPage(Page.CHAT)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
