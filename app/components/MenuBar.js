import React, {Component, PropTypes} from 'react';
import styles from './Menubar.css';
import Layout from 'material-ui/Layout'
import FontAwesome from 'react-fontawesome';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

class MenuBar extends Component {
  render() {
    return (
      <Layout container direction="column" gutter={8}>
        <IconButton accent>
          <FontAwesome name='user-circle-o' />
        </IconButton>
        <IconButton>
          <Badge badgeContent={4} badgeClassName={styles.badge}>
            <FontAwesome name='download' />
          </Badge>
        </IconButton>
        <IconButton>
          <FontAwesome name='inbox' />
        </IconButton>
        <IconButton>
          <FontAwesome name='bolt' />
        </IconButton>
        <IconButton>
          <FontAwesome name='upload' />
        </IconButton>
      </Layout>
    );
  }
}

MenuBar.propTypes = {};
MenuBar.defaultProps = {};

export default MenuBar;
