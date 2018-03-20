// @flow
import * as chatActions from './chat'
import * as contactActions from './contact'
import * as contactListActions from './contactList'
import * as globalErrorActions from './globalError'
import * as identityActions from './identity'
import * as identityListActions from './identityList'
import * as ipfsActions from './ipfs'
import * as ipfsObjectActions from './ipfsObject'
import * as profileActions from './profile'
import * as shareActions from './share'
import * as shareListActions from './shareList'
import * as uiActions from './ui'

export default {
  ...chatActions,
  ...contactActions,
  ...contactListActions,
  ...globalErrorActions,
  ...identityActions,
  ...identityListActions,
  ...ipfsActions,
  ...ipfsObjectActions,
  ...profileActions,
  ...shareActions,
  ...shareListActions,
  ...uiActions,
}
