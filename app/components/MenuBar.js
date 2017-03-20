import React, {Component, PropTypes} from 'react';
// import styles from './Menubar.css';
import Layout from 'material-ui/Layout'
import FontAwesome from 'react-fontawesome';
import IconButton from 'material-ui/IconButton';

class MenuBar extends Component {
  render() {
    return (
      <Layout container direction="column" gutter={8}>
        <IconButton accent>
          <FontAwesome name='user-circle-o' />
        </IconButton>
        <IconButton>
          <FontAwesome name='download' />
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
