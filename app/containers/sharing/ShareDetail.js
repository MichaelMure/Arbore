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
  onFavoriteClickGenerator: (share: Share) => () => {
    dispatch(shareActions.toggleFavorite(share))
  },
  onStartClickGenerator: (share: Share) => () => {
    dispatch(shareActions.start(share))
  },
  onPauseClickGenerator: (share: Share) => () => {
    dispatch(shareActions.pause(share))
  },
  onStopClickGenerator: (share: Share) => () => {
    dispatch(shareActions.abort(share))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareDetail)
