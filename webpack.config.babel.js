import webpack from 'webpack';
import path from 'path';
import qs from 'querystring';

export default {
  mode: process.env.NODE_ENV || "development",
  devtool: '#eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/',
    globalObject: 'this'
  },
  resolve: {
    modules: ['src','node_modules']
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
        exclude: [/node_modules/, /build/, /public/],
        include: [/src/],
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
        test: /\.css$/,
        loader: 'style-loader!css-loader?' + qs.stringify({
          modules: true,
          importLoaders: 1,
          localIdentName: '[path][name]-[local]'
        })
      },

      // Files
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ["file-loader"]
      }
    ]
  }
};
