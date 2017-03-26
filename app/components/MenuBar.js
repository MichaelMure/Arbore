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
        <IconButton>
          <Badge badgeContent={4} badgeClassName={styles.badge}>
            <FontAwesome name='download'/>
          </Badge>
        </IconButton>
        <IconButton>
          <FontAwesome name='inbox'/>
        </IconButton>
        <IconButton>
          <FontAwesome name='bolt'/>
        </IconButton>
        <IconButton>
          <FontAwesome name='upload'/>
        </IconButton>
        <IconButton onClick={this.props.onFavoriteClick}>
          <FontAwesome name='heart'/>
        </IconButton>
      </Layout>
    );
  }
}

MenuBar.propTypes = {
  onProfileClick: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired
};
MenuBar.defaultProps = {};

export default MenuBar;
