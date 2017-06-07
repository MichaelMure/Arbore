// @flow
import { connect } from 'react-redux'
import * as globalError from 'actions/globalError'
import GlobalError from 'components/GlobalError'

const mapStateToProps = (state) => ({
  error: state.globalError
})

const mapDispatchToProps = dispatch => ({
  onCloseClick: () => { dispatch(globalError.resetError()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(GlobalError)
