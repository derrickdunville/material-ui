import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import qs from 'querystring'
import webpack from 'webpack'
import merge from 'webpack-merge'
import common from './webpack.client.common.js'

module.exports = merge(common,
  {
    target: 'web',
    mode: 'development',
    devServer: {
      // This will allow for react router to work in hot environment. If a route doesn't match webpack-dev-server will fallback onto index.html which end up pushing the browser route to react router.
      historyApiFallback: true,
      contentBase: path.join(__dirname, '..', 'public'),
      hot: true,
      proxy: {
        '/api/*': {
          target: 'http://[::1]:3001',
          pathRewrite: { '^/api': '' },
          secure: false
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, '..', 'src','index.html')
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
);
