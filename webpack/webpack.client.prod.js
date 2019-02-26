import webpack from 'webpack'
import merge from 'webpack-merge'
import qs from 'querystring';
import common from './webpack.client.common.js'
import TerserPlugin from 'terser-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin';

module.exports = merge(common,
  {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({ // <-- key to reducing React's size
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new CompressionPlugin({
        algorithm: 'gzip'
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 6,
            compress: true,
            output: {
              comments: false,
              beautify: false
            }
          }
        })
      ]
    }
  }
);
