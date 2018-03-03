// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import MenuBar from 'containers/menu/MenuBar'
import SharingPage from 'containers/sharing/SharingPage'
import ContactPage from 'containers/contact/ContactPage'
import ChatPage from 'containers/chat/ChatPage'
import NewShareDrawer from 'containers/sharing/NewShareDrawer'
import NewSharePage from 'containers/sharing/NewSharePage'
import ProfileDrawer from 'containers/profile/ProfileDrawer'
import ProfilePage from 'containers/profile/ProfilePage'
import SettingsPage from 'containers/settings/SettingsPage'
import { Page } from 'models/UiState'
import type { PageType } from 'models/UiState'

class Home extends Component {

  props: {
    page: PageType
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.wrapper}>
        <div className={classes.sidebar}>
          <MenuBar />
        </div>
        <div className={classes.content}>
          { this.props.page === Page.SHARING  &&  <SharingPage />  }
          { this.props.page === Page.CHAT     &&  <ChatPage />     }
          { this.props.page === Page.CONTACT  &&  <ContactPage />  }
          { this.props.page === Page.SETTINGS &&  <SettingsPage /> }

          <ProfileDrawer>
            <ProfilePage />
          </ProfileDrawer>

          <NewShareDrawer>
            <NewSharePage />
          </NewShareDrawer>
        </div>
      </div>
    );
  }
}

const style = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.main
  },
  sidebar: {
    zIndex: 10,
    backgroundColor: theme.palette.background.main
  },
  content: {
    flex: 1,
    position: 'relative'
  }
})

export default withStyles(style)(Home)
