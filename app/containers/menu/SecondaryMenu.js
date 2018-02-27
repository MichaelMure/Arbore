// @flow
import { connect } from 'react-redux'
import * as ui from 'actions/ui'
import * as identityList from 'actions/identityList'
import SecondaryMenu from 'components/menu/SecondaryMenu'
import { Store } from 'utils/types'

const mapStateToProps = (state: Store) => ({
  profile:    state.profile,
})

const mapDispatchToProps = dispatch => ({
  onProfileClick:   () => { dispatch(ui.toggleProfile()) },
  onLogoutClick: () => { dispatch(identityList.logout()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryMenu)
