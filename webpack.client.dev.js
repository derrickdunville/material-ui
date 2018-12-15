import merge from 'webpack-merge'
import common from './webpack.client.common.js'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = merge(common,
  {
    mode: 'development',
    // devtool: 'inline-source-map',

    // plugins: [
    //   new HtmlWebpackPlugin({
    //     filename: 'index.html',
    //     template: path.join(__dirname, 'src','index.html')
    //   })
    // ]
  }
);
