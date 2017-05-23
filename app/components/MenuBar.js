// @Flow
import React, {Component} from 'react'
import styles from './MenuBar.css'
import Avatar from 'material-ui/Avatar'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import FontAwesome from 'react-fontawesome'
import Profile from 'models/Profile'
import UiState from 'models/UiState'
import ShareList from 'models/ShareList'

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

  formatBadge(value: number) {
    return (value > 0) ? value : ''
  }

  render() {
    const profile: Profile = this.props.profile

    return (
      <div className={styles.wrapper}>
        <IconButton onClick={this.props.onProfileClick} accent={this.props.profileSelected}>
          { profile.avatarUrl
            ? <Avatar src={profile.avatarUrl} />
            : <FontAwesome name='user-circle-o' className={styles.profile} />
          }
        </IconButton>

        <div className={styles.spacer}></div>

        <IconButton onClick={this.props.onNewShareClick} accent={this.props.newShareSelected}>
          <Badge badgeContent="+">
            <FontAwesome name='envelope-open-o'/>
          </Badge>
        </IconButton>

        <div className={styles.spacer}></div>

        <IconButton onClick={this.props.onAvailableClick} accent={this.props.availableSelected}>
          <Badge badgeContent={this.formatBadge(this.props.available)} badgeClassName={styles.badge}>
            <FontAwesome name='download'/>
          </Badge>
        </IconButton>
        <IconButton onClick={this.props.onInboxClick} accent={this.props.inboxSelected}>
          <Badge badgeContent={this.formatBadge(this.props.inbox)} badgeClassName={styles.badge}>
            <FontAwesome name='inbox'/>
          </Badge>
        </IconButton>
        <IconButton onClick={this.props.onActiveClick} accent={this.props.activeSelected}>
          <Badge badgeContent={this.formatBadge(this.props.active)} badgeClassName={styles.badge}>
            <FontAwesome name='bolt'/>
          </Badge>
        </IconButton>
        <IconButton onClick={this.props.onSharingClick} accent={this.props.sharingSelected}>
          <Badge badgeContent={this.formatBadge(this.props.sharing)} badgeClassName={styles.badge}>
            <FontAwesome name='upload'/>
          </Badge>
        </IconButton>
        <IconButton onClick={this.props.onFavoriteClick} accent={this.props.favoriteSelected}>
          <Badge badgeContent={this.formatBadge(this.props.favorite)} badgeClassName={styles.badge}>
            <FontAwesome name='heart'/>
          </Badge>
        </IconButton>

        <div className={styles.spacer}></div>

        <IconButton onClick={this.props.onChatClick} accent={this.props.chatSelected}>
          <Badge badgeContent={''} badgeClassName={styles.badge}>
            <FontAwesome name='comments'/>
          </Badge>
        </IconButton>

        <div className={styles.spacer}></div>

        <IconButton onClick={this.props.onContactClick} accent={this.props.contactSelected}>
          <Badge badgeContent={''} badgeClassName={styles.badge}>
            <FontAwesome name='users'/>
          </Badge>
        </IconButton>
      </div>
    )
  }
}

export default MenuBar;
