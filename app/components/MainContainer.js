import React, {Component, PropTypes} from 'react';
import styles from './MainContainer.css';
import Share from '../models/Share'
import ShareList from '../models/ShareList'
import TextField from 'material-ui/TextField';
import CompactShare from './CompactShare';
import ShareDetail from '../containers/ShareDetail';

class MainContainer extends Component {
  render() {
    const shares = this.props.shares.filtered
    const selectedShare = this.props.shares.selected
    const selectedId = this.props.shares.selectedId

    const sharesComps = shares.map((share : Share) => (
      // TODO: using the index as key is ineficient if reordering can happen
      <CompactShare
        key={share.id}
        share={share}
        selected={share.id == selectedId}
        onClick={this.props.onClickGenerator(share.id)}
      />
    ));

    return (
      <div className={styles.wrapper}>
        <div className={styles.list} >
          <TextField label={"Search"} />
          <div className={styles.scroller}>
            { sharesComps }
          </div>
        </div>
        <div className={styles.details}>
          { selectedShare && <ShareDetail /> }
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  shares: PropTypes.instanceOf(ShareList).isRequired,
  onClickGenerator: PropTypes.func.isRequired
};
MainContainer.defaultProps = {};

export default MainContainer;
