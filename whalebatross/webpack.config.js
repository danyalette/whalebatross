var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,

  entry: './assets/baseapp/js/index', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

  output: {
      path: path.resolve('./assets/baseapp/bundles/'),
      filename: "[name]-[hash].js",
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    loaders: [
      {
          test: /\.jsx?$/,         // Match both .js and .jsx files
          exclude: /node_modules/,
          loader: "babel",
          query:
            {
              presets:['es2015', 'react']
            }
      },
      {
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ],
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx'],
    root: path.resolve('./assets/baseapp/js'),
  },
}