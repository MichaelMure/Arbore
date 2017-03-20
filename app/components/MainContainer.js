import React, {Component, PropTypes} from 'react';
import styles from './MainContainer.css';
import Layout from 'material-ui/Layout'
import TextField from 'material-ui/TextField';
import { List, ListItem, ListItemText } from 'material-ui/List';
import CompactShare from './CompactShare.js';

class MainContainer extends Component {
  render() {
    return (
      <Layout container align={"stretch"}>
        <Layout item xs className={styles.blah1}>
          <TextField label={"Search"} />
          <Layout container >
            <Layout item xs={12}><CompactShare /></Layout>
            <Layout item xs={12}><CompactShare /></Layout>
            <Layout item xs={12}><CompactShare /></Layout>
            <Layout item xs={12}><CompactShare /></Layout>
          </Layout>
        </Layout>
        <Layout item xs className={styles.blah2}>
          BBBB
        </Layout>
      </Layout>
    );
  }
}

MainContainer.propTypes = {};
MainContainer.defaultProps = {};

export default MainContainer;

