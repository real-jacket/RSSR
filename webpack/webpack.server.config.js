// webpack/webpack.dev.config.js
//webpack 配置文件
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const { resolvePath } = require('../utils/index');

process.env.BABEL_ENV = 'node'; //设置 babel 的运行环境

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  target: 'node',
  entry: resolvePath('../src/server/app/index.js'), //入口文件
  output: {
    filename: 'app.js',
    path: resolvePath('../dist/server'),
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __SERVER__: true,
    }),
  ],
};
