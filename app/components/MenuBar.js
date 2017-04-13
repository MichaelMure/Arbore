import React, {Component, PropTypes} from 'react';
import styles from './MenuBar.css';
import IconButton from 'material-ui/IconButton'
import FontAwesome from 'react-fontawesome';
import Badge from 'material-ui/Badge';

class MenuBar extends Component {

  formatBadge(value: number) {
    return (value > 0) ? value : ''
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <IconButton accent onClick={this.props.onProfileClick}>
          <FontAwesome name='user-circle-o'/>
        </IconButton>

        <div className={styles.spacer}></div>

        <IconButton onClick={this.props.onAvailableClick}>
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

        <IconButton onClick={this.props.onFavoriteClick}>
          <Badge badgeContent={this.formatBadge(this.props.favorite)} badgeClassName={styles.badge}>
            <FontAwesome name='comments'/>
          </Badge>
        </IconButton>

        <div className={styles.spacer}></div>

        <IconButton onClick={this.props.onFavoriteClick}>
          <Badge badgeContent={this.formatBadge(this.props.favorite)} badgeClassName={styles.badge}>
            <FontAwesome name='users'/>
          </Badge>
        </IconButton>
      </div>
    )
  }
}

MenuBar.propTypes = {
  onProfileClick: PropTypes.func.isRequired,
  onAvailableClick: PropTypes.func.isRequired,
  onInboxClick: PropTypes.func.isRequired,
  onActiveClick: PropTypes.func.isRequired,
  onSharingClick: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,

  available: PropTypes.number.isRequired,
  inbox: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  sharing: PropTypes.number.isRequired,
  favorite: PropTypes.number.isRequired,
};
MenuBar.defaultProps = {};

export default MenuBar;
