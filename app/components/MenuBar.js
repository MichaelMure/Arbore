import React, {Component, PropTypes} from 'react';
import styles from './Menubar.css';
import { List, ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FolderIcon from 'material-ui/svg-icons/folder';

class MenuBar extends Component {
  render() {
    return (
      <List>
        <ListItem button><FolderIcon /></ListItem>
        <Divider />
        <ListItem button><FolderIcon /></ListItem>
        <ListItem button><FolderIcon /></ListItem>
        <ListItem button><FolderIcon /></ListItem>
        <ListItem button><FolderIcon /></ListItem>
        <ListItem button><FolderIcon /></ListItem>
      </List>
    );
  }
}

MenuBar.propTypes = {};
MenuBar.defaultProps = {};

export default MenuBar;
