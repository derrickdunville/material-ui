import fs from 'fs';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { createHashHistory } from "history";
// eslint-disable-next-line no-sync
import Server from './Server'
import { SheetsRegistry } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import serialize from 'serialize-javascript'
import { Helmet } from 'react-helmet'

function renderApp(req, store, context) {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();
  // Create a sheetsManager instance.
  const sheetsManager = new Map();
  // Create a theme instance.
  const theme = createMuiTheme({palette: {}});
  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  // Render the application to a string so we can push it down to browser before the client bundle takes over
  const rendered = renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <Provider store={store}>
          <Server location={req.url} context={context}/>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  );
  // All the required CSS from the compenents that need to be renderered on the requested path were put into our sheetsRegistry. We need to inject this into the intial page load style so it rendered the same style as the client.
  const css = sheetsRegistry.toString()

  // We also need to inject the base css manually.
  // This appears to be a work around for loading a style sheet that was used as an import in Dashboard layout
  const base_css = fs.readFileSync('./src/assets/css/material-dashboard-react.css', 'utf8');
  const combined_css = css + " " + base_css

  // Lastly we need to inject our header tags into our head - these allow social media site to create nice looking embeds
  const helmet = Helmet.renderStatic()

  return `
    <!DOCTYPE html>
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000">
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" />
        <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Orbitron" />
        <script src="https://js.stripe.com/v3/"></script>

      </head>
      <body>
        <div id="root">${rendered}</div>
        <style id="jss-server-side">${combined_css}</style>
        <script type="text/javascript">
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `
}

export default renderApp;
