// @flow
import { connect } from 'react-redux'
import SelectIdentity from 'components/login/SelectIdentity'
import { formName }from 'components/login/IdentityPrompt'
import Identity from 'models/Identity'
import { reset } from 'redux-form'

let opened = null

const mapStateToProps = (state) => ({
  identities: state.identityList,
  opened
})

const mapDispatchToProps = dispatch => ({
  onIdentityOpen: (identity: Identity) => {
    opened = identity
    dispatch(reset(formName))
  },
  onFinish: () => {
    opened = null
    dispatch(reset(formName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectIdentity)

