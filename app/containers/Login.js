// @flow
import { connect } from 'react-redux'
import LoginPage from 'components/login/LoginPage'
import Identity from 'models/Identity'

import * as identityList from 'actions/identityList'

const mapStateToProps = (state) => ({
  identities: state.identityList
})

const mapDispatchToProps = dispatch => ({
  onIdentityClickGenerator: (identity: Identity) => (() => {
    dispatch(identityList.login(identity))
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

