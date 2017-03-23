// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import MenuBar from './MenuBar.js';
import MainContainer from './MainContainer.js';
import Profile from './Profile'

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profileOpen: false
    };
  }

  toggleProfile() {
    this.setState({
      profileOpen: !(this.state.profileOpen)
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <MenuBar
            onProfileClick={this.toggleProfile.bind(this)}
          />
        </div>
        <div className={styles.content}>
          <MainContainer />
          <Profile
            onBackgroundClick={this.toggleProfile.bind(this)}
            open={this.state.profileOpen}
          />
        </div>
      </div>
    );
  }
}
