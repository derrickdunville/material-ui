import webpack from 'webpack';
import path from 'path';
import qs from 'querystring';

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  mode: process.env.NODE_ENV,
  devtool: '#eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname,'src','index.js')
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: [path.resolve(__dirname,'src'),'node_modules']
  },
  devServer: {
    contentBase: path.join(__dirname,'src')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      // Javascript
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        query: {
          "env": {
            "development": {
              "plugins": ["react-hot-loader/babel"],
            }
          },
        }
      },

      // CSS
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
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
