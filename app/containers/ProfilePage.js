// @flow
import { connect } from 'react-redux'
import * as ui from '../actions/ui'
import * as ipfsFile from '../actions/ipfs'

import ProfileEdit from '../components/ProfileEdit'
import { Store } from '../utils/types'


const mapStateToProps = (state: Store) => ({
  profile: state.profile
})

const mapDispatchToProps = dispatch => ({
  // onTest: () => dispatch(ipfsFile.fetchDirectoryMetadata(multihashes.fromB58String('QmPhnvn747LqwPYMJmQVorMaGbMSgA7mRRoyyZYz3DoZRQ')))
  onTest: () => {
    // add new EmptyIpfsObject(hash)
    dispatch(ipfsFile.fetchDirectoryMetadata('/ipfs/QmPhnvn747LqwPYMJmQVorMaGbMSgA7mRRoyyZYz3DoZRQ'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)
