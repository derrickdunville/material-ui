import App from './components/App';
import configureStore from './store';
import fs from 'fs';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
// import Client from "./Client"
import { createHashHistory } from "history";
// eslint-disable-next-line no-sync
// const template = fs.readFileSync('index.html', 'utf8');

function renderApp(path, callback) {
  const store = configureStore();
  const state = store.getState();

  const rendered = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // const page = template
  //   .replace('<!-- CONTENT -->', rendered)
  //   .replace('"-- STORES --"', JSON.stringify(state));

  const page =`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" />
        <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <title>React Tutorial</title>
      </head>
      <body>
        <div id="root">${rendered}</div>
        <script type="text/javascript">
          window.initialStoreData = ${JSON.stringify(state)};
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `
  callback(null, page);
}

export default renderApp;
