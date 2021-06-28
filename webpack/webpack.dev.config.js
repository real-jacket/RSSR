const webpack = require('webpack');
const { resolvePath } = require('../utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: resolvePath('../src/client/app/index.js'),
  },
  output: {
    filename: '[name].js',
    path: resolvePath('../dist/static'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __SERVER__: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
