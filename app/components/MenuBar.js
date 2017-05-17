// @Flow
import React, {Component, PropTypes} from 'react'
import styles from './MenuBar.css'
import Avatar from 'material-ui/Avatar'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import FontAwesome from 'react-fontawesome'
import Profile from 'models/Profile'

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
    const { profile } = this.props
    return (
      <div className={styles.wrapper}>
        <IconButton accent onClick={this.props.onProfileClick}>
          { profile.avatarUrl
            ? <Avatar src={profile.avatarUrl} />
            : <FontAwesome name='user-circle-o' className={styles.profile} />
          }

        </IconButton>

        <div className={styles.spacer}></div>

        <IconButton onClick={this.props.onNewShareClick}>
          <Badge badgeContent="+">
            <FontAwesome name='envelope-open-o'/>
          </Badge>
        </IconButton>

        <div className={styles.spacer}></div>

        <IconButton onClick={this.props.onAvailableClick}>
          <Badge badgeContent={this.formatBadge(this.props.available)} badgeClassName={styles.badge}>
            <FontAwesome name='download'/>
          </Badge>
        </IconButton>
        <IconButton onClick={this.props.onInboxClick}>
          <Badge badgeContent={this.formatBadge(this.props.inbox)} badgeClassName={styles.badge}>
            <FontAwesome name='inbox'/>
          </Badge>
        </IconButton>
        <IconButton onClick={this.props.onActiveClick}>
          <Badge badgeContent={this.formatBadge(this.props.active)} badgeClassName={styles.badge}>
            <FontAwesome name='bolt'/>
          </Badge>
        </IconButton>
        <IconButton onClick={this.props.onSharingClick}>
          <Badge badgeContent={this.formatBadge(this.props.sharing)} badgeClassName={styles.badge}>
            <FontAwesome name='upload'/>
          </Badge>
        </IconButton>
        <IconButton onClick={this.props.onFavoriteClick}>
          <Badge badgeContent={this.formatBadge(this.props.favorite)} badgeClassName={styles.badge}>
            <FontAwesome name='heart'/>
          </Badge>
        </IconButton>

        <div className={styles.spacer}></div>

        <IconButton onClick={this.props.onChatClick}>
          <Badge badgeContent={''} badgeClassName={styles.badge}>
            <FontAwesome name='comments'/>
          </Badge>
        </IconButton>

        <div className={styles.spacer}></div>

        <IconButton onClick={this.props.onContactClick}>
          <Badge badgeContent={''} badgeClassName={styles.badge}>
            <FontAwesome name='users'/>
          </Badge>
        </IconButton>
      </div>
    )
  }
}

export default MenuBar;
