// Client Base configuration
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import RobotstxtPlugin from 'robotstxt-webpack-plugin'

import qs from 'querystring';
import merge from 'webpack-merge'
import common from './webpack.common.js'
import webpack from 'webpack'

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
      new CleanWebpackPlugin(['public']),
      new RobotstxtPlugin({filePath: 'robots.txt'})
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
      ]
    }
  }
);
