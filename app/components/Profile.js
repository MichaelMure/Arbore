// @flow
import React, {Component, PropTypes} from 'react';
import styles from './Profile.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Profile extends Component {

  render() {

    let overlayClass = cx({
      overlay: true,
      overlayOpen: this.props.open
    })

    const drawerClass = cx({
      drawer: true,
      drawerOpen: this.props.open
    })

    return (
      <div className={styles.wrapper}>
        <div className={overlayClass} onClick={this.props.onBackgroundClick}/>
        <div className={drawerClass}>
          Profile
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  onBackgroundClick: PropTypes.func.isRequired,
  open: PropTypes.bool
};
Profile.defaultProps = {
  open: false
};

export default Profile;
