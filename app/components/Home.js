// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import MenuBar from '../containers/MenuBar';
import MainContainer from './MainContainer';
import ProfilePage from '../containers/ProfilePage'

export default class Home extends Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <MenuBar />
        </div>
        <div className={styles.content}>
          <MainContainer />
          <ProfilePage />
        </div>
      </div>
    );
  }
}
