// Client Base configuration
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import qs from 'querystring';
import merge from 'webpack-merge'
import common from './webpack.common.js'

module.exports = merge(common,
  {
    // target: 'web',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
      filename: "bundle.js"
    },
    plugins: [
      new CleanWebpackPlugin(['public'])
    ],
    module: {
      rules: [
        // CSS
        // We can not use style loader on the server side, however we need to bundle the client with style loader
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?' + qs.stringify({
            modules: true,
            importLoaders: 1,
            localIdentName: '[path][name]-[local]'
          })
        },
      ]
    }
  }
);
