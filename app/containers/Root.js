// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Home from 'containers/Home'
import LoginPage from 'components/login/LoginPage'
import GlobalError from 'containers/GlobalError'
import IpfsStatus from 'containers/IpfsStatus'
import { Theme } from 'models/Settings'

const dark = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      main: '#303030',
      dark: '#212121',
      light: '#424242',
      darker: '#202020',
      emphasize: '#484848',
    }
  },
})

const light = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      main: '#fafafa',
      dark: '#f5f5f5',
      light: '#ffffff',
      darker: '#e0e0e0',
      emphasize: '#dcdcdc',
    }
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
