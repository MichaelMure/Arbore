// @flow
import * as ipfsFileActions from './ipfsfile'
import * as profileActions from './profile'
import * as shareActions from './share'
import * as shareListActions from './shareList'
import * as uiActions from './ui'

export default {
  ...ipfsFileActions,
  ...profileActions,
  ...shareActions,
  ...shareListActions,
  ...uiActions,
}
