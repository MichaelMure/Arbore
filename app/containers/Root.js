// @flow
import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from '../components/Home'

export default function Root({ store }) {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <Home />
      </MuiThemeProvider>
    </Provider>
  );
}
