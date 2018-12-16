// Server Base configuration for prod, dev environments. Server does not support hot realoding at this time.
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import qs from 'querystring';
import webpackNodeExternals from 'webpack-node-externals';
import merge from 'webpack-merge'
import common from './webpack.common.js';

module.exports = merge(common,
  {
    // the server will always be in the node environment
    target: 'node',
    entry: path.join(__dirname, '..', 'server.js'),
    output: {
      path: path.resolve(__dirname, '..', 'build'),
      publicPath: '/',
      filename: "bundle.js"
    },
    plugins: [
      new CleanWebpackPlugin(['build'])
    ],

    module: {
      rules: [

        // The server requires a different loader for css then the client. Server is unable to use style loader because of window being undefined on the server.

        // window is for the browser. It might be possible to define an empty global.window on the server to keep node_modules that refernece the window from failing during server side rendering.
        {
          test: /\.(css|scss)$/,
          use: [
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    }
  }
);
