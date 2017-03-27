// @flow
import { connect } from 'react-redux'
import { Store } from '../utils/types'
import MainContainer from '../components/MainContainer'
import * as sharelist from '../actions/shareList'

const mapStateToProps = (state: Store) => ({
  shares: state.shareList
})

const mapDispatchToProps = dispatch => ({
  onClickGenerator: (index) => (
    () => (dispatch(sharelist.setSelected(index)))
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
