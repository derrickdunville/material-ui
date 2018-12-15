import merge from 'webpack-merge'
import qs from 'querystring';
import common from './webpack.client.common.js'

module.exports = merge(common,
  {
    mode: 'production',
    devtool: 'source-map'
    // module: {
    //   rules: [
    //     // CSS
    //     // We can not use style loader on the server side, however we need to bundle the client with style loader
    //     {
    //       test: /\.css$/,
    //       loader: 'style-loader!css-loader?' + qs.stringify({
    //         modules: true,
    //         importLoaders: 1,
    //         localIdentName: '[path][name]-[local]'
    //       }),
    //       sideEffects: true
    //     },
    //     {
    //       test: /\.scss$/,
    //       loader: 'sass-loader'
    //     }
    //   ]
    // }
  }
);
