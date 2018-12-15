import merge from 'webpack-merge'
import common from './webpack.server.common.js'

module.exports = merge(common,
  {
    mode: 'production',
    devtool: 'source-map'
  }

  // other pligins for production here
);
