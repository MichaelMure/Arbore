// @Flow
import React, {Component} from 'react'
import styles from './MenuBar.css'
import Avatar from 'material-ui/Avatar'
import Profile from 'models/Profile'
import MenuItem from 'components/menu/MenuItem'
import FontAwesome from 'react-fontawesome'

import Minimize from 'react-feather/dist/icons/minimize'
import Maximize from 'react-feather/dist/icons/maximize'
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
          <FontAwesome name='users'/>
        </MenuItem>

        <div className={styles.spacer} />

        <MenuItem open={open} name="newshare" label="Share" onClick={this.props.onNewShareClick}
            accent={this.props.newShareSelected}>
          <Badge badgeContent="+">
            <FontAwesome name='envelope-open-o'/>
          </Badge>
        </MenuItem>

        <div className={styles.spacer} />

        <MenuItem open={open} name="available" label="Available" onClick={this.props.onAvailableClick}
            badgeValue={this.props.available} accent={this.props.availableSelected}>
          <FontAwesome name='download'/>
        </MenuItem>

        <MenuItem open={open} name="active" label="Actives" onClick={this.props.onActiveClick}
                  badgeValue={this.props.active} accent={this.props.activeSelected}>
          <FontAwesome name='bolt'/>
        </MenuItem>

        <MenuItem open={open} name="inbox" label="Inbox" onClick={this.props.onInboxClick}
            badgeValue={this.props.inbox} accent={this.props.inboxSelected}>
            <FontAwesome name='inbox'/>
        </MenuItem>

        <MenuItem open={open} name="upload" label="Upload" onClick={this.props.onSharingClick}
            badgeValue={this.props.sharing} accent={this.props.sharingSelected}>
            <FontAwesome name='upload'/>
        </MenuItem>

        <MenuItem open={open} name="fav" label="Favorites" onClick={this.props.onFavoriteClick}
            badgeValue={this.props.favorite} accent={this.props.favoriteSelected}>
            <FontAwesome name='star'/>
        </MenuItem>

        <div className={styles.spacer} />

        <MenuItem open={open} name="chat" label="Chat" onClick={this.props.onChatClick}
            badgeValue={this.props.chatUnread} accent={this.props.chatSelected}>
            <FontAwesome name='comments'/>
        </MenuItem>

        <div className={styles.expander} />

          <FontAwesome name='cog'/>
        <MenuItem open={open} name="settings" label="Settings" onClick={this.props.onSettingsClick}>
        </MenuItem>

        <MenuItem open={open} name='toggle' label={open ? 'Collapse' : 'Expand'} onClick={this.props.toggle}>
          { open ? <Minimize/> : <Maximize/> }
        </MenuItem>
      </nav>
    )
  }
}

export default MenuBar;
