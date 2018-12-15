import merge from 'webpack-merge'
import common from './webpack.server.common.js'
import webpackNodeExternals from 'webpack-node-externals';

module.exports = merge(common,
  {
    mode: 'development',
    // devtool: 'inline-source-map',
    externals: [webpackNodeExternals()]
  }
);
