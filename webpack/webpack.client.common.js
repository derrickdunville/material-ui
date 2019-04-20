// Client Base configuration
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import RobotstxtPlugin from 'robotstxt-webpack-plugin'

import qs from 'querystring';
import merge from 'webpack-merge'
import common from './webpack.common.js'
import webpack from 'webpack'

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'development' || 'true')),
  'process.env': {
    API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:3001/'),
    DISCORD_CLIENT_ID: JSON.stringify(process.env.DISCORD_CLIENT_ID),
    DISCORD_CALLBACK: JSON.stringify(process.env.DISCORD_CALLBACK),
    DISCORD_GUILD_ID: JSON.stringify(process.env.DISCORD_GUILD_ID || "353342769630281738"),
    DISCORD_WELCOME_CHANNEL_ID: JSON.stringify(process.env.DISCORD_WELCOME_CHANNEL_ID || "544943256283119626"),
    RECAPTCHA_SITE_KEY: JSON.stringify(process.env.RECAPTCHA_SITE_KEY),
    STRIPE_PUBLISHABLE_KEY: JSON.stringify(process.env.STRIPE_PUBLISHABLE_KEY)
  }
});

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
      new RobotstxtPlugin({filePath: 'robots.txt'}),
      definePlugin
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
