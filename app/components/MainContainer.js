import React, {Component, PropTypes} from 'react';
import styles from './MainContainer.css';
import TextField from 'material-ui/TextField';
import CompactShare from './CompactShare';
import ShareDetail from './ShareDetail';

import shareFixtures from '../models/fixtures/share'

class MainContainer extends Component {
  render() {
    const shares = shareFixtures.map((share, index) => (
       // TODO: using the index as key is ineficient if reordering can happen
      <CompactShare key={index} share={share} />
    ));
    return (
      <div className={styles.wrapper}>
        <div className={styles.column} >
          <TextField label={"Search"} />
          { shares }
        </div>
        <div className={styles.column}>
          <ShareDetail share={shareFixtures[1]} />
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {};
MainContainer.defaultProps = {};

export default MainContainer;
