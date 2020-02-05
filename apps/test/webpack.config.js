const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@babel/preset-react' ],
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
    new webpack.DefinePlugin({
      AUTH0_DOMAIN: JSON.stringify('domain'),
      AUTH0_CLIENT_ID: JSON.stringify('client_id'),
      AUTH0_REDIRECT_URI: JSON.stringify('redirect_uri'),
      AUTH0_TYPE: JSON.stringify('type'),
      AUTH0_SCOPE: JSON.stringify('scope'),
      AUTH0_AUDIENCE: JSON.stringify('audience')
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
    open: true,
    inline: true,
    watchContentBase: true,
    port: 3001
  },
  node: {
    tls: 'empty',
    net: 'empty',
    fs: 'empty',
    dns: 'empty'
  }
};