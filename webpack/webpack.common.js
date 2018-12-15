// Base configuration for both client and server
import path from 'path'

module.exports = {
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
      }
    ]
  }
};
