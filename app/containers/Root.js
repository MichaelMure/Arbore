// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'
import Home from 'containers/Home'
import LoginPage from 'components/login/LoginPage'
import GlobalError from 'containers/GlobalError'
import IpfsStatus from 'containers/IpfsStatus'

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

// const theme = dark
const theme = light

export default class Root extends Component {

  props: {
    loginStore: any,
    fullStore: any
  }

  constructor(props) {
    super(props)
    this.state = { selected: null }
  }

  componentDidMount() {
    // Root is not connected to the store so we need to
    // manually force update when state.identityList.selected change
    this.props.loginStore.subscribe(() => {
      const store = this.props.loginStore
      const state = store.getState()
      const selected = state.identityList.selected

      if(selected !== this.state.selected) {
        this.setState({ selected: selected })
      }
    })
  }

  render() {
    const { loginStore, fullStore } = this.props

    const isLogged = loginStore.getState().identityList.isLogged
    const store = isLogged ? fullStore : loginStore
    const key = isLogged ? 'full' : 'login'

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
