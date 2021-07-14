// webpack/webpack.dev.config.js
//webpack 配置文件
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const { resolvePath } = require('../utils/index');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

process.env.BABEL_ENV = 'node'; //设置 babel 的运行环境

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // mode: 'development',
  target: 'node',
  entry: resolvePath('../src/server/app/index.js'), //入口文件
  output: {
    filename: 'app.js',
    path: resolvePath('../dist/server'),
    publicPath: `/dist/server/`,
  },
  resolve: {
    alias: {
      '@dist': path.resolve(__dirname, '../dist'),
    },
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              esModule: false,
            },
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
    new CleanWebpackPlugin(),
    new LoadablePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __IS_PROD__: isProd,
      __SERVER__: true,
    }),
  ],
};
