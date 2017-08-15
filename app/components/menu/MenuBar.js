// @Flow
import React, {Component} from 'react'
import styles from './MenuBar.css'
import Avatar from 'material-ui/Avatar'
import Badge from 'material-ui/Badge'
import FontAwesome from 'react-fontawesome'
import Profile from 'models/Profile'
import MenuItem from 'components/menu/MenuItem'

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
  }

  render() {
    const profile: Profile = this.props.profile

    return (
      <nav className={styles.wrapper}>

        <MenuItem name="profile" label="Profile" onClick={this.props.onProfileClick} accent={this.props.profileSelected}>
          { profile.avatarUrl
            ? <Avatar src={profile.avatarUrl} />
            : <FontAwesome name='user-circle-o' className={styles.profile} />
          }
        </MenuItem>

        <div className={styles.spacer} />

        <MenuItem name="contact" label="Contacts" onClick={this.props.onContactClick} accent={this.props.contactSelected}>
          <FontAwesome name='users'/>
        </MenuItem>

        <div className={styles.spacer} />

        <MenuItem name="newshare" label="Share something" onClick={this.props.onNewShareClick}
            accent={this.props.newShareSelected}>
          <Badge badgeContent="+">
            <FontAwesome name='envelope-open-o'/>
          </Badge>
        </MenuItem>

        <div className={styles.spacer} />

        <MenuItem name="available" label="Available" onClick={this.props.onAvailableClick}
            badgeValue={this.props.available} accent={this.props.availableSelected}>
          <FontAwesome name='download'/>
        </MenuItem>

        <MenuItem name="active" label="Actives" onClick={this.props.onActiveClick}
                  badgeValue={this.props.active} accent={this.props.activeSelected}>
          <FontAwesome name='bolt'/>
        </MenuItem>

        <MenuItem name="inbox" label="Inbox" onClick={this.props.onInboxClick}
            badgeValue={this.props.inbox} accent={this.props.inboxSelected}>
            <FontAwesome name='inbox'/>
        </MenuItem>

        <MenuItem name="upload" label="Upload" onClick={this.props.onSharingClick}
            badgeValue={this.props.sharing} accent={this.props.sharingSelected}>
            <FontAwesome name='upload'/>
        </MenuItem>

        <MenuItem name="fav" label="Favorites" onClick={this.props.onFavoriteClick}
            badgeValue={this.props.favorite} accent={this.props.favoriteSelected}>
            <FontAwesome name='heart'/>
        </MenuItem>

        <div className={styles.spacer} />

        <MenuItem name="chat" label="Chat" onClick={this.props.onChatClick} accent={this.props.chatSelected}>
            <FontAwesome name='comments'/>
        </MenuItem>

        <div className={styles.spacer} />

        <MenuItem name="settings" label="Settings" onClick={this.props.onSettingsClick}>
          <FontAwesome name='cog'/>
        </MenuItem>

      </nav>
    )
  }
}

export default MenuBar;
