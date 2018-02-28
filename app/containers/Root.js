// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Home from 'containers/Home'
import LoginPage from 'components/login/LoginPage'
import GlobalError from 'containers/GlobalError'
import IpfsStatus from 'containers/IpfsStatus'
import { Theme } from 'models/Settings'

import blueGrey from 'material-ui/colors/blueGrey'
import grey from 'material-ui/colors/grey'
import blue from 'material-ui/colors/blue'
import green from 'material-ui/colors/green'
import pink from 'material-ui/colors/pink'
import red from 'material-ui/colors/red'
import {darken, lighten} from 'material-ui/styles/colorManipulator'

const tonalOffset = 0.2

const createBackgroundShade = (color) => ({
  darker: darken(color, tonalOffset * 2.5),
  dark:   darken(color, tonalOffset * 1.5),
  main:   color,
  light:  lighten(color, tonalOffset),

  // darker:        color[type === 'dark' ? 900 : 300],
  // dark:          color[type === 'dark' ? 800 : 200],
  // main:          color[type === 'dark' ? 700 : 100],
  // light:         color[type === 'dark' ? 600 : 50]
})

const dark = createMuiTheme({
  palette: {
    type: 'dark',
    // primary: red,
    background: createBackgroundShade(grey[800])
  },
})

const light = createMuiTheme({
  palette: {
    type: 'light',
    // primary: {
    //   main: blueGrey[100]
    // },
    // secondary: blue
    background: createBackgroundShade(grey[300])
  },
})

export default class Root extends Component {

  props: {
    loginStore: any,
    fullStore: any
  }

  constructor(props) {
    super(props)
    this.state = {
      selected: null,
      theme: null
    }
  }

  componentDidMount() {
    // Root is not connected to the store so we need to
    // manually force update when state.identityList.selected or state.identityList.theme change
    this.props.loginStore.subscribe(() => {
      const store = this.props.loginStore
      const state = store.getState()
      const selected = state.identityList.selected
      const theme = state.identityList.theme

      if(selected !== this.state.selected) {
        this.setState({ selected: selected })
      }

      if(theme !== this.state.theme) {
        this.setState({ theme: theme })
      }
    })
  }

  render() {
    const { loginStore, fullStore } = this.props

    const loginState = loginStore.getState()
    const isLogged = loginState.identityList.isLogged
    const store = isLogged ? fullStore : loginStore
    const key = isLogged ? 'full' : 'login'

    const theme = loginState.identityList.theme === Theme.LIGHT
      ? light
      : dark

    return (
      <MuiThemeProvider theme={theme}>
        <Provider key={ key } store={ store }>
          <div>
            { isLogged ? <Home /> : <LoginPage /> }
            <GlobalError />
            <IpfsStatus />
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
