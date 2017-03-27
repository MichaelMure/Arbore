// @flow
import { connect } from 'react-redux'
import * as share from '../actions/share'
import { Store } from '../utils/types'
import ShareDetail from '../components/ShareDetail'


const mapStateToProps = (state: Store) => ({
  share: state.shareList.selected
})

const mapDispatchToProps = dispatch => ({
  onFavoriteClickGenerator: (index) => (
    () => (dispatch(share.toggleFavorite(index)))
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareDetail)
