import webpack from 'webpack';
import path from 'path';
import qs from 'querystring';
import webpackNodeExternals from 'webpack-node-externals';

export default {
  // Inform webpack that we are building a bundle for Nodejs, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our server application
  entry: path.join(__dirname,'server.js'),

  // Tell webpack where to put the output file that is genereated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    globalObject: 'this'
  },
  // Tell webpack not to output any libs in node_modules folder so they will not be included inside out server side bundles.
  externals: [webpackNodeExternals()],
  mode: process.env.NODE_ENV || "development",
  devtool: '#eval-source-map',
  resolve: {
    modules: ['src', 'node_modules']
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
        exclude: [/node_modules/, /public/, /build/],
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
          "css-loader",
          "sass-loader"
        ]
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'isomorphic-style-loader',
      //     {
      //       loader: 'css-loader?' + qs.stringify({
      //         modules: true,
      //         importLoaders: 1,
      //         localIdentName: '[path][name]-[local]'
      //       })
      //     }
      //   ]
      // },

      // Files
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ["file-loader"]
      }
    ]
  }
};
