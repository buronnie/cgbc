const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcPath = path.join(__dirname, 'src');

const config = {
  entry: {
    app: path.join(srcPath, 'app.js'),
    vendor: path.join(srcPath, 'vendor.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc'), {encoding: 'utf8'}))
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      package: package,
      filename: 'index.html',
      template: path.join(srcPath, 'index.html')
    }),
    new CopyWebpackPlugin([
      { from: 'src/finance', to: 'finance' }
    ])
  ]
};

module.exports = config;
