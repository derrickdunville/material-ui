import configureStore from './store';
import fs from 'fs';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
// import Client from "./Client"
import { createHashHistory } from "history";
// eslint-disable-next-line no-sync
// const template = fs.readFileSync('index.html', 'utf8');
import Server from './Server'
import { SheetsRegistry } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

function renderApp(path, callback) {
  const store = configureStore();
  const state = store.getState();

    // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
  });

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  const rendered = renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <Provider store={store}>
          <Server location={path}/>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  );
  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString()

  // const page = template
  //   .replace('<!-- CONTENT -->', rendered)
  //   .replace('"-- STORES --"', JSON.stringify(state));
  // const base_css = fs.readFileSync('./assets/css/material-dashboard-react.css', 'utf8');

  // console.log(base_css)
  const page =`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" />
        <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <title>React Tutorial</title>
      </head>
      <body>
        <div id="root">${rendered}</div>
        <style>body { margin: 0 }</stlye>
        <style id="jss-server-side">${css}</style>
        <script type="text/javascript">
          root.initialStoreData = ${JSON.stringify(state)};
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `
  callback(null, page);
}

export default renderApp;
