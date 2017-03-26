// @flow
import { connect } from 'react-redux'
import { Store } from '../utils/types'
import component from '../components/MainContainer'

const mapStateToProps = (state: Store) => ({
  shares: state.shareList,
  selectedShare: null
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, null)(component)
