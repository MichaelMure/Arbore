// @flow
import { connect } from 'react-redux'
import * as ui from 'actions/ui'
import SecondaryMenu from 'components/menu/SecondaryMenu'
import { Store } from 'utils/types'


const mapStateToProps = (state: Store) => ({
  profile:    state.profile,
})

const mapDispatchToProps = dispatch => ({
  onProfileClick:   () => { dispatch(ui.toggleProfile()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryMenu)
