// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'
import Home from 'containers/Home'
import LoginPage from 'components/login/LoginPage'
import GlobalError from 'containers/GlobalError'
import IpfsStatus from 'containers/IpfsStatus'
import { Theme } from 'models/Settings'

const dark = createMuiTheme({
  palette: createPalette({
    type: 'dark',
  }),
})

const light = createMuiTheme({
  palette: createPalette({
    type: 'light',
  }),
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
