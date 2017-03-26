// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

type RootType = {
  store: {},
  history: {}
};

export default function Root({ store, history }: RootType) {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={history} routes={routes} />
      </MuiThemeProvider>
    </Provider>
  );
}
