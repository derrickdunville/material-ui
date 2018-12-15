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
    entry: path.join(__dirname, '..', 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, '..', 'public'),
      publicPath: '/',
      filename: "bundle.js"
    },
    plugins: [
      new CleanWebpackPlugin(['public'])
    ],
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader"
          ]
        }
        // {
        //   test: /\.css$/,
        //   loader: 'style-loader!css-loader?' + qs.stringify({
        //     modules: true,
        //     importLoaders: 1,
        //     localIdentName: '[path][name]-[local]'
        //   }),
        //   sideEffects: true
        // },
        // {
        //   test: /\.scss$/,
        //   loader: 'sass-loader'
        // }
      ]
    }
  }
);
