// @flow
import React, {Component, PropTypes} from 'react';
import styles from './Drawer.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default class Drawer extends Component {

  render() {

    const overlayClass = cx({
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
          {this.props.children}
        </div>
      </div>
    );
  }
}

Drawer.propTypes = {
  onBackgroundClick: PropTypes.func.isRequired,
  open: PropTypes.bool
};
Drawer.defaultProps = {
  open: false
};
