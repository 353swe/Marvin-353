// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
const appRoot = 'src'; // the app root folder: src, src_users, etc
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  app_root: appRoot, // the app root folder, needed by the other webpack configs
  devtool: 'source-map',
  context: __dirname,
  entry: [
    // http://gaearon.github.io/react-hot-loader/getstarted/
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    path.join(__dirname, appRoot, 'index.js'),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot-loader/webpack', 'babel'],
        exclude: /node_modules/,
      },
      {
        // https://github.com/jtangelder/sass-loader
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  debug: true,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
  plugins: [
    new CleanWebpackPlugin(['public/main.css', 'public/bundle.js'], {
      root: path.join(__dirname, 'public'),
      verbose: true,
      dry: false, // true for simulation
    })
  ],
};
