import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Client from "./Client"
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { createHashHistory } from "history";
import reducers from "./reducers"


// Create a theme instance.
const theme = createMuiTheme({palette: {}});
// Create a new class name generator.
const generateClassName = createGenerateClassName();

// Get the server side store from window and create the client side store from it
const store = createStore(reducers, window.INITIAL_STATE, applyMiddleware(thunk))

ReactDOM.hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Client />
      </Provider>
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById("root")
);
