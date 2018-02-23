// @Flow
import React, {Component} from 'react'
import styles from './MenuBar.css'
import Avatar from 'material-ui/Avatar'
import Profile from 'models/Profile'
import MenuItem from 'components/menu/MenuItem'
import FontAwesome from 'react-fontawesome'

import Users from 'react-feather/dist/icons/users'
import Share from 'react-feather/dist/icons/share-2'
import Download from 'react-feather/dist/icons/download'
import Inbox from 'react-feather/dist/icons/inbox'
import Upload from 'react-feather/dist/icons/upload'
import Star from 'react-feather/dist/icons/star'
import Message from 'react-feather/dist/icons/message-square'
import Settings from 'react-feather/dist/icons/settings'
import Activity from 'react-feather/dist/icons/activity'
import ChevronsLeft from 'react-feather/dist/icons/chevrons-left'
import ChevronsRight from 'react-feather/dist/icons/chevrons-right'

class MenuBar extends Component {

  props: {
    profile: Profile,

    onProfileClick: () => void,
    onNewShareClick: () => void,
    onAvailableClick: () => void,
    onInboxClick: () => void,
    onActiveClick: () => void,
    onSharingClick: () => void,
    onFavoriteClick: () => void,
    onContactClick: () => void,
    onChatClick: () => void,
    onSettingsClick: () => void,

    profileSelected: boolean,
    newShareSelected: boolean,
    availableSelected: boolean,
    inboxSelected: boolean,
    activeSelected: boolean,
    sharingSelected: boolean,
    favoriteSelected: boolean,
    contactSelected: boolean,
    chatSelected: boolean,

    available: number,
    inbox: number,
    active: number,
    sharing: number,
    favorite: number,
    chatUnread: number,

    open: boolean,
    toggle: () => void
  }

  render() {
    const profile: Profile = this.props.profile
    const open: boolean = this.props.open

    return (
      <nav className={styles.wrapper}>

        <MenuItem open={open} name="profile" label="Profile" onClick={this.props.onProfileClick}
          accent={this.props.profileSelected}>
          { profile.avatarUrl
            ? <Avatar src={profile.avatarUrl} />
            : <FontAwesome name='user-circle-o' className={styles.profile} />
          }
        </MenuItem>

        <div className={styles.spacer} />

        <MenuItem open={open} name="contact" label="Contacts" onClick={this.props.onContactClick}
          accent={this.props.contactSelected}>
          <Users/>
        </MenuItem>

        <div className={styles.spacer} />

        <MenuItem open={open} name="newshare" label="Share" onClick={this.props.onNewShareClick}
            accent={this.props.newShareSelected}>
          <Share/>
        </MenuItem>

        <div className={styles.spacer} />

        <MenuItem open={open} name="available" label="Available" onClick={this.props.onAvailableClick}
            badgeValue={this.props.available} accent={this.props.availableSelected}>
          <Download/>
        </MenuItem>

        <MenuItem open={open} name="active" label="Actives" onClick={this.props.onActiveClick}
                  badgeValue={this.props.active} accent={this.props.activeSelected}>
          <Activity/>
        </MenuItem>

        <MenuItem open={open} name="inbox" label="Inbox" onClick={this.props.onInboxClick}
            badgeValue={this.props.inbox} accent={this.props.inboxSelected}>
            <Inbox/>
        </MenuItem>

        <MenuItem open={open} name="upload" label="Upload" onClick={this.props.onSharingClick}
            badgeValue={this.props.sharing} accent={this.props.sharingSelected}>
            <Upload/>
        </MenuItem>

        <MenuItem open={open} name="fav" label="Favorites" onClick={this.props.onFavoriteClick}
            badgeValue={this.props.favorite} accent={this.props.favoriteSelected}>
            <Star/>
        </MenuItem>

        <div className={styles.spacer} />

        <MenuItem open={open} name="chat" label="Chat" onClick={this.props.onChatClick}
            badgeValue={this.props.chatUnread} accent={this.props.chatSelected}>
            <Message/>
        </MenuItem>

        <div className={styles.expander} />

        <MenuItem open={open} name="settings" label="Settings" onClick={this.props.onSettingsClick}>
          <Settings/>
        </MenuItem>

        <MenuItem open={open} name='toggle' label={open ? 'Collapse' : 'Expand'} onClick={this.props.toggle}>
          { open ? <ChevronsLeft/> : <ChevronsRight/> }
        </MenuItem>
      </nav>
    )
  }
}

export default MenuBar;
