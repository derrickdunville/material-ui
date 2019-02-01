import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
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
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true
})

// Create a theme instance.
const theme = createMuiTheme({
  palette: {},
});
// Create a new class name generator.
const generateClassName = createGenerateClassName();

// Get the server side store from window and create the client side store from it
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :compose;
const store = createStore(reducers, typeof window === 'object' ? window.INITIAL_STATE : {}, composeEnhancers(applyMiddleware(thunk.withExtraArgument(axiosInstance))))


// Hot Reload reducers during client side development - recompile server to test updated reducers during server-side rendering
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require("./reducers").default);
  });
}

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
