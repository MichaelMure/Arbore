import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import './app.global.css';

let store = configureStore();

// Kinda hacky
// setInterval(() => {
//   store.dispatch(fetchLocalObject())
// }, 1000)

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root')
);

// This allow to reload the store with a different user prefix
// Kinda brutal, sorry !
export const changeStorePrefix = (prefix: string) => {
  store = configureStore(prefix)
  render(
    <AppContainer key={prefix}>
      <Root store={store}/>
    </AppContainer>,
    document.getElementById('root')
  );
}

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
