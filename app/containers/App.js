// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <MuiThemeProvider>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}
