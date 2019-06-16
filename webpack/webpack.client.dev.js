import merge from 'webpack-merge'
import common from './webpack.client.common.js'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import qs from 'querystring';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

module.exports = merge(common,
  {
    mode: 'development',
    devtool: 'inline-source-map'
  }
);
