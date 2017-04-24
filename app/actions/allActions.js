// @flow
import * as contactListActions from './contact'
import * as identityListActions from './identityList'
import * as ipfsObjectActions from './ipfsObject'
import * as profileActions from './profile'
import * as shareActions from './share'
import * as shareListActions from './shareList'
import * as uiActions from './ui'

export default {
  ...contactListActions,
  ...identityListActions,
  ...ipfsObjectActions,
  ...profileActions,
  ...shareActions,
  ...shareListActions,
  ...uiActions,
}
