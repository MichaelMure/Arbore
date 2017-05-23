// @flow
import { connect } from 'react-redux'
import * as ui from 'actions/ui'
import * as sharelist from 'actions/shareList'
import { ShareListFilter } from 'models/ShareList'
import MenuBar from 'components/MenuBar'
import { Store } from 'utils/types'
import { Page } from 'models/UiState'


const mapStateToProps = (state: Store) => ({
  profile:   state.profile,
  available: state.shareList.available,
  inbox:     state.shareList.inbox,
  active:    state.shareList.active,
  sharing:   state.shareList.sharing,
  favorite:  state.shareList.favorite,

  profileSelected:   state.ui.profileOpen,
  newShareSelected:  state.ui.newShareOpen,
  availableSelected: !state.ui.drawerOpen && state.ui.page === Page.SHARING && state.shareList.filter === ShareListFilter.AVAILABLE,
  inboxSelected:     !state.ui.drawerOpen && state.ui.page === Page.SHARING && state.shareList.filter === ShareListFilter.INBOX,
  activeSelected:    !state.ui.drawerOpen && state.ui.page === Page.SHARING && state.shareList.filter === ShareListFilter.ACTIVE,
  sharingSelected:   !state.ui.drawerOpen && state.ui.page === Page.SHARING && state.shareList.filter === ShareListFilter.SHARING,
  favoriteSelected:  !state.ui.drawerOpen && state.ui.page === Page.SHARING && state.shareList.filter === ShareListFilter.FAV,
  contactSelected:   !state.ui.drawerOpen && state.ui.page === Page.CONTACT,
  chatSelected:      !state.ui.drawerOpen && state.ui.page === Page.CHAT,
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
