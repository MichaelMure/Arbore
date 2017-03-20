// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import MenuBar from './MenuBar.js';
import MainContainer from './MainContainer.js';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <MenuBar />
        </div>
        <div className={styles.content}>
          <MainContainer />
        </div>
      </div>
    );
  }
}
