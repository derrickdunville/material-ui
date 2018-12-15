import merge from 'webpack-merge'
import common from './webpack.server.common.js'
import webpackNodeExternals from 'webpack-node-externals';

module.exports = merge(common,
  {
    mode: 'production',
    devtool: 'source-map'
  }

  // other pligins for production here
);
