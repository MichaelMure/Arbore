// @flow
import { connect } from 'react-redux'
import { Store } from 'utils/types'
import ChatPage from 'components/chat/ChatPage'

const mapStateToProps = (state: Store) => ({
  profile: state.profile,
  contacts: state.contactList
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
