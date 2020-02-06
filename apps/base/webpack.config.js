const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack'); 

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              [
                '@babel/plugin-proposal-class-properties',
                {
                  'loose': true
                }
              ]
            ]
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
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
    open: true,
    inline: true,
    watchContentBase: true,
    port: 3002
  },
  node: {
    tls: 'empty',
    net: 'empty',
    fs: 'empty',
    dns: 'empty'
  }
};