import React, {Component, PropTypes} from 'react';
import styles from './MenuBar.css';
import Layout from 'material-ui/Layout'
import IconButton from 'material-ui/IconButton'
import FontAwesome from 'react-fontawesome';
import Badge from 'material-ui/Badge';

class MenuBar extends Component {
  render() {
    return (
      <Layout container direction="column" gutter={8}>
        <IconButton accent onClick={this.props.onProfileClick}>
          <FontAwesome name='user-circle-o'/>
        </IconButton>
        <IconButton onClick={this.props.onAvailableClick}>
          <Badge badgeContent={this.props.available} badgeClassName={styles.badge}>
            <FontAwesome name='download'/>
          </Badge>
        </IconButton>
        <IconButton onClick={this.props.onInboxClick}>
          <Badge badgeContent={this.props.inbox} badgeClassName={styles.badge}>
            <FontAwesome name='inbox'/>
          </Badge>
        </IconButton>
        <IconButton onClick={this.props.onActiveClick}>
          <Badge badgeContent={this.props.active} badgeClassName={styles.badge}>
            <FontAwesome name='bolt'/>
          </Badge>
        </IconButton>
        <IconButton onClick={this.props.onSharingClick}>
          <Badge badgeContent={this.props.sharing} badgeClassName={styles.badge}>
            <FontAwesome name='upload'/>
          </Badge>
        </IconButton>
        <IconButton onClick={this.props.onFavoriteClick}>
          <Badge badgeContent={this.props.favorite} badgeClassName={styles.badge}>
            <FontAwesome name='heart'/>
          </Badge>
        </IconButton>
      </Layout>
    );
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
