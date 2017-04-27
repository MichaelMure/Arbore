// @flow
import React, { Component } from 'react'
import styles from './LoginPage.css'
import Collapse from 'material-ui/transitions/Collapse'
import Fade from 'material-ui/transitions/Fade'
import NewProfile from 'components/profile/NewProfile'
import SelectIdentity from 'containers/SelectIdentity'

import logo from '../../../resources/logo.svg'

class LoginPage extends Component {

  state = {
    selectIdentityOpen: true,
    newIdentityOpen: false
  }

  handleNewIdentityClick() {
    this.setState({
      selectIdentityOpen: false,
      newIdentityOpen: true
    })
  }

  handleCancel() {
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
            <SelectIdentity onNewIdentityClick={ ::this.handleNewIdentityClick } />
          </Fade>
        </Collapse>
        <Collapse in={this.state.newIdentityOpen} >
          <Fade in={this.state.newIdentityOpen} >
            <NewProfile onCancelClick={ ::this.handleCancel } />
          </Fade>
        </Collapse>
      </div>
    )
  }
}

export default LoginPage
