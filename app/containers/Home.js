// @flow
import { connect } from 'react-redux'

import Home from 'components/Home'
import { Store } from 'utils/types'

const mapStateToProps = (state: Store) => ({
  page: state.ui.page
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, null)(Home)
