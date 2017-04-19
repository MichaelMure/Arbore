// @flow
import React, { Component } from 'react';
import styles from './Drawer.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default class Drawer extends Component {

  props: {
    onBackgroundClick: () => void,
    open: boolean,
    big: boolean
  };

  static defaultProps = {
    open: false
  };

  render() {

    const overlayClass = cx({
      overlay: true,
      overlayOpen: this.props.open
    })

    const drawerClass = cx({
      drawer: true,
      drawerOpen: this.props.open,
      drawerSmall: !this.props.big,
      drawerBig: this.props.big
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
