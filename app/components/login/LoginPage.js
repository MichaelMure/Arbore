// @flow
import React, { Component } from 'react'
import styles from './LoginPage.css'
import Collapse from 'material-ui/transitions/Collapse'
import Fade from 'material-ui/transitions/Fade'
import NewProfile from 'containers/profile/NewProfile'
import SelectIdentity from 'containers/login/SelectIdentity'

import logo from '../../../resources/logo.svg'

class LoginPage extends Component {

  state = {
    selectIdentityOpen: true,
    newIdentityOpen: false
  }

  showNewProfile() {
    this.setState({
      selectIdentityOpen: false,
      newIdentityOpen: true
    })
  }

  showIdentityList() {
    this.setState({
      selectIdentityOpen: true,
      newIdentityOpen: false
    })
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <img src={logo} className={styles.logo} />
        <Collapse in={this.state.selectIdentityOpen} >
          <Fade in={this.state.selectIdentityOpen} >
            <SelectIdentity onNewIdentityClick={ ::this.showNewProfile } />
          </Fade>
        </Collapse>
        <Collapse in={this.state.newIdentityOpen} >
          <Fade in={this.state.newIdentityOpen} >
            <NewProfile showIdentityList={ ::this.showIdentityList } />
          </Fade>
        </Collapse>
      </div>
    )
  }
}

export default LoginPage
