// @flow
import React, { Component } from 'react'
import styles from './Home.css'
import MenuBar from '../containers/MenuBar'
import SharingPage from '../containers/SharingPage'
import ContactPage from '../containers/ContactPage'
import ChatPage from '../components/ChatPage'
import ProfileDrawer from '../containers/ProfileDrawer'
import ProfilePage from '../containers/ProfilePage'
import { Page } from '../models/UiState'
import type { PageType } from '../models/UiState'

export default class Home extends Component {

  props: {
    page: PageType
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <MenuBar />
        </div>
        <div className={styles.content}>
          { this.props.page === Page.SHARING  &&  <SharingPage /> }
          { this.props.page === Page.CHAT     &&  <ChatPage />    }
          { this.props.page === Page.CONTACT  &&  <ContactPage /> }

          <ProfileDrawer>
            <ProfilePage />
          </ProfileDrawer>
        </div>
      </div>
    );
  }
}
