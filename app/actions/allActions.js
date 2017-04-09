// @flow
import * as ipfsActions from './ipfs'
import * as profileActions from './profile'
import * as shareActions from './share'
import * as shareListActions from './shareList'
import * as uiActions from './ui'

export default {
  ...ipfsActions,
  ...profileActions,
  ...shareActions,
  ...shareListActions,
  ...uiActions,
}
