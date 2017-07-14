// @flow
import { connect } from 'react-redux'
import * as shareActions from 'actions/share'
import type { Store } from 'utils/types'
import ShareDetail from 'components/sharing/ShareDetail'
import Share from 'models/Share'

const mapStateToProps = (state: Store) => ({
  share: state.shareList.selected,
  profile: state.profile,
  contactList: state.contactList
})

const mapDispatchToProps = dispatch => ({
  onFavoriteClickGenerator: (share: Share) => async () => {
    dispatch(shareActions.toggleFavorite(share.id))
  },
  onStartClickGenerator: (share: Share) => () => {
    // TODO
  },
  onPauseClickGenerator: (share: Share) => () => {
    // TODO
  },
  onStopClickGenerator: (share: Share) => () => {
    // TODO
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareDetail)
