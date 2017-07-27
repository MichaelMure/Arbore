// @flow
import { connect } from 'react-redux'
import * as contactListActions from 'actions/contactList'
import * as uiActions from 'actions/ui'
import type { Store } from 'utils/types'
import ShareRecipients from 'components/sharing/ShareRecipients'
import Contact from 'models/Contact'
import { Page } from 'models/UiState'

const mapStateToProps = (state: Store) => ({
  contactList: state.contactList
})

const mapDispatchToProps = dispatch => ({
  onContactClickGenerator: (contact: ?Contact) => () => {
    if(!contact) {
      return
    }

    dispatch(contactListActions.setSelected(contact.pubkey))
    dispatch(contactListActions.setSearch(''))
    dispatch(uiActions.setPage(Page.CONTACT))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareRecipients)
