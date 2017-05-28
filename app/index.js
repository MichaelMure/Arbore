// @flow
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './containers/Root'
import { getLoginStore, addfullStoreChangeCallback } from './store'
import './app.global.css'

let loginStore = null
let fullStore = null

addfullStoreChangeCallback((promise) => {
  promise.then((store) => {
    fullStore = store
    renderApp(loginStore, store)
  })
})

getLoginStore().then(store => {
  loginStore = store
  renderApp(store, fullStore)
})

function renderApp(loginStore, fullStore) {
  render(
    <AppContainer>
      <Root loginStore={loginStore} fullStore={fullStore} />
    </AppContainer>,
    document.getElementById('root')
  )
}

// Prevent borking the app by dropping file into the windows
document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())


if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot loginStore={loginStore} fullStore={fullStore} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
