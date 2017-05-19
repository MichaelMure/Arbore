// @flow
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './containers/Root'
import { getLoginStore, getFullStore } from './store'
import './app.global.css'

export const loginStore = getLoginStore().store
let fullStore = null
let currentPrefix = null

export function loadFullStore(prefix, name) {
  if(prefix !== currentPrefix) {
    const { store, onComplete } = getFullStore(prefix, name)
    fullStore = store
    currentPrefix = prefix

    render(
      <AppContainer>
        <Root loginStore={loginStore} fullStore={fullStore} />
      </AppContainer>,
      document.getElementById('root')
    );

    return onComplete
  }
  return Promise.resolve(fullStore)
}

render(
  <AppContainer>
    <Root loginStore={loginStore} fullStore={fullStore} />
  </AppContainer>,
  document.getElementById('root')
);


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
