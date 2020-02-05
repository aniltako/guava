const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// var GlobalConfigPlugin = require('./plugins/GlobalConfigPlugin');
const Dotenv = require('dotenv-webpack'); 

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'Guava'
    }),
    new Dotenv({
      path: './.env',
      safe: true
    })
  ]
};