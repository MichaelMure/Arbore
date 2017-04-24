// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Home from 'containers/Home'
import LoginPage from 'containers/Login'

export default class Root extends Component {

  constructor(props) {
    super(props)
    this.state = { selected: null }
  }

  componentDidMount() {
    // Root is not connected to the store so we need to
    // manually force update when state.identityList.selected change
    this.props.store.subscribe(() => {
      const store = this.props.store
      const state = store.getState()
      const selected = state.identityList.selected

      if(selected !== this.state.selected) {
        this.setState({ selected: selected })
      }
    })
  }

  render() {
    return (
      <Provider store={ this.props.store }>
        <MuiThemeProvider>
          { this.props.store.getState().identityList.isLogged ?
            <Home /> :
            <LoginPage />
          }
        </MuiThemeProvider>
      </Provider>
    )
  }
}
