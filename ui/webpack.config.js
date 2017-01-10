const fs = require('fs');
const path = require('path');
const webpack = require("webpack");
const srcPath = path.join(__dirname, 'src');

const config = {
  module: {
    loaders: [{
      test: /[\.jsx|\.js]$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        "presets": ["es2015", "stage-1", "react"]
      }
    }]
  },
  resolve: {
    alias: {
      'react': 'inferno-compat',
      'react-dom': 'inferno-compat'
    }
  }
};

module.exports = config;
