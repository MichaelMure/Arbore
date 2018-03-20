import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Share from 'models/Share'
import Profile from 'models/Profile'
import ShareList from 'models/ShareList'
import CompactShare from './CompactShare'
import SecondaryMenu from 'containers/menu/SecondaryMenu'
import ShareDetail from 'containers/sharing/ShareDetail'
import ContactList from 'models/ContactList'
import SearchField from '../SearchField'

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
    const { classes, shareList, onSearchChange } = this.props
    const shares = shareList.filtered
    const selectedShare = shareList.selected
    const selectedId = shareList.selectedId

    return (
      <div className={classes.wrapper}>
        <SearchField onChange={onSearchChange} />

        <SecondaryMenu />

        <div className={classes.list} >
          { this.renderShares(shares, selectedId) }
        </div>

        <div className={classes.details}>
          { selectedShare && shareList.idInFiltered(selectedId) && <ShareDetail /> }
        </div>
      </div>
    )
  }
}

const style = theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gridTemplateRows: 'auto 1fr',
    height: '100vh',
    backgroundColor: theme.palette.background.dark,
  },
  list: {
    overflow: 'auto',
    backgroundColor: theme.palette.background.main,
    padding: 10,
  },
  details: {
    overflow: 'auto',
    backgroundColor: theme.palette.background.main,
    padding: 10,
  }
})

export default withStyles(style)(SharingPage)
