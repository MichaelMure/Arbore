import React, {Component, PropTypes} from 'react';
import styles from './MainContainer.css';
import Layout from 'material-ui/Layout'

class MainContainer extends Component {
  render() {
    return (
      <Layout container align={"stretch"}>
        <Layout item xs className={styles.blah1}>
          AAAA
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

