import merge from 'webpack-merge'
import common from './webpack.client.common.js'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import qs from 'querystring';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

module.exports = merge(common,
  {
    mode: 'development',
    // devtool: 'inline-source-map',
    devtool: 'source-map',
    // module: {
    //   rules: [
    //     // CSS
    //     // We can not use style loader on the server side, however we need to bundle the client with style loader
    //     {
    //       test: /\.(scss|css)$/,
    //       use: [
    //           MiniCssExtractPlugin.loader,
    //           { loader: 'style-loader'},
    //           {
    //             loader: 'css-loader',
    //             options: {
    //               url: false,
    //               sourceMap: true,
    //               importLoaders: 1
    //             }
    //           },
    //           {
    //             loader: 'sass-loader',
    //             options: {
    //               sourceMap: true
    //             }
    //           }
    //       ]
    //     }
    // plugins: [
    //   new MiniCssExtractPlugin(
    //     {filename: `styles/[name].css`}),
    // ],
  }
);
