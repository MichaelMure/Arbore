// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
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
    const { classes } = this.props

    return (
      <div className={classes.wrapper}>
        <img src={logo} className={classes.logo} />
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

const style = theme => ({
  wrapper: {
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
  },
  logo: {
    width: '200px',
    height: '200px',
    marginBottom: '60px',
    userSelect: 'none',
    pointerEvents: 'none',
  }
})

export default withStyles(style)(LoginPage)
