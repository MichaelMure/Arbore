import React, { Component } from 'react'
import styles from './SharingPage.css'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Share from 'models/Share'
import Profile from 'models/Profile'
import ShareList from 'models/ShareList'
import CompactShare from './CompactShare'
import ShareDetail from 'containers/sharing/ShareDetail'
import ContactList from 'models/ContactList'

class SharingPage extends Component {
  props: {
    shareList: ShareList,
    contactList: ContactList,
    profile: Profile,
    onClickGenerator: (id: number) => () => void,
    onSearchChange: () => void,
  }

  renderShares(shares, selectedId) {
    const { contactList, profile } = this.props

    if(shares.count() > 0) {
      return shares.map((share : Share) => {
        const author = share.isAuthor
          ? profile
          : contactList.findContactInDirectory(share.authorPubkey)

        return <CompactShare
          key={share.id}
          share={share}
          author={author}
          selected={share.id === selectedId}
          onClick={this.props.onClickGenerator(share.id)}
        />
      })
    }

    return (<Typography>Nothing here yet.</Typography>)
  }

  render() {
    const { shareList } = this.props
    const shares = shareList.filtered
    const selectedShare = shareList.selected
    const selectedId = shareList.selectedId

    return (
      <div className={styles.wrapper}>
        <div className={styles.list} >
          <TextField label='Search' fullWidth onChange={this.props.onSearchChange} />
          <div className={styles.scroller}>
            { this.renderShares(shares, selectedId) }
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.scroller}>
            { selectedShare && shareList.idInFiltered(selectedId) && <ShareDetail /> }
          </div>
        </div>
      </div>
    )
  }
}

export default SharingPage;
