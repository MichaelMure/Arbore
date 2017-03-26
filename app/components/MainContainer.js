import React, {Component, PropTypes} from 'react';
import styles from './MainContainer.css';
import Share from '../models/Share'
import ShareList from '../models/ShareList'
import TextField from 'material-ui/TextField';
import CompactShare from './CompactShare';
import ShareDetail from './ShareDetail';

class MainContainer extends Component {
  render() {
    const shares = this.props.shares.filtered
    const selectedShare = this.props.selectedShare

    const sharesComps = shares.map((share, index) => (
       // TODO: using the index as key is ineficient if reordering can happen
      <CompactShare key={index} share={share} />
    ));
    return (
      <div className={styles.wrapper}>
        <div className={styles.list} >
          <TextField label={"Search"} />
          { sharesComps }
        </div>
        <div className={styles.details}>
          { selectedShare &&
          <ShareDetail share={selectedShare} />
          }
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  shares: PropTypes.instanceOf(ShareList).isRequired,
  selectedShare: PropTypes.instanceOf(Share)
};
MainContainer.defaultProps = {};

export default MainContainer;
