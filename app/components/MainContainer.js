import React, {Component, PropTypes} from 'react';
import styles from './MainContainer.css';
import Layout from 'material-ui/Layout'
import TextField from 'material-ui/TextField';
import CompactShare from './CompactShare';
import ShareDetail from './ShareDetail';

import shareFixtures from '../models/fixtures/share'
import contactFixtures from '../models/fixtures/contact'

class MainContainer extends Component {
  render() {
    return (
      <Layout container align={"stretch"}>
        <Layout item xs className={styles.blah1}>
          <TextField label={"Search"} />
          <Layout container >
            <Layout item xs={12}><CompactShare share={shareFixtures[0]} contact={contactFixtures[0]}/></Layout>
            <Layout item xs={12}><CompactShare share={shareFixtures[1]} contact={contactFixtures[1]}/></Layout>
            <Layout item xs={12}><CompactShare share={shareFixtures[2]} contact={contactFixtures[2]}/></Layout>
            <Layout item xs={12}><CompactShare share={shareFixtures[1]} contact={contactFixtures[3]}/></Layout>
          </Layout>
        </Layout>
        <Layout item xs className={styles.blah2}>
          <ShareDetail />
        </Layout>
      </Layout>
    );
  }
}

MainContainer.propTypes = {};
MainContainer.defaultProps = {};

export default MainContainer;
