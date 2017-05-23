// @flow
import { connect } from 'react-redux'
import type { Store } from 'utils/types'
import ChatPage from 'components/chat/ChatPage'
import * as ui from 'actions/ui'
import { Page } from 'models/UiState'

const mapStateToProps = (state: Store) => ({
  contacts: state.contactList,
})

const mapDispatchToProps = dispatch => ({
  onGoToContactClick: () => { dispatch(ui.setPage(Page.CONTACT)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
