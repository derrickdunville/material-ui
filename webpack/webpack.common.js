// Base configuration for both client and server
import path from 'path'
import webpack from 'webpack'

const webpackDefine = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:3001/'),
    DISCORD_CLIENT_ID: JSON.stringify(process.env.DISCORD_CLIENT_ID),
    DISCORD_CALLBACK: JSON.stringify(process.env.DISCORD_CALLBACK),
    DISCORD_GUILD_ID: JSON.stringify(process.env.DISCORD_GUILD_ID),
    DISCORD_WELCOME_CHANNEL_ID: JSON.stringify(process.env.DISCORD_WELCOME_CHANNEL_ID),
    RECAPTCHA_SITE_KEY: JSON.stringify(process.env.RECAPTCHA_SITE_KEY),
    STRIPE_PUBLISHABLE_KEY: JSON.stringify(process.env.STRIPE_PUBLISHABLE_KEY)
  }
});

module.exports = {
  plugins: [
    webpackDefine
  ],
  resolve: {
    modules: [path.join(__dirname, '..', 'src'), 'node_modules']
  },
  module: {
    rules: [
      // Javascript compilation will be the same for all builds
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        include: path.join(__dirname, '..', 'src')
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      // Files
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ["file-loader"]
      },
      // Favicon
      {
        test: /\.(ico)$/,
        loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
      }
    ]
  }
};
