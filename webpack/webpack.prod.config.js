const webpack = require('webpack');
const { resolvePath } = require('../utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: resolvePath('../src/client/app/index.js'),
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: resolvePath('../dist/static'),
    publicPath: '/',
  },
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
              // isomorphic-style-loader 5.x 与 css-loader 5.x 冲突，需加上这个配置，配面导出成模块对象
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
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]',
              publicPath: '/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      __IS_PROD__: true,
      __SERVER__: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    new LoadablePlugin(),
    new WebpackManifestPlugin({
      fileName: resolvePath('../dist/server/asset-manifest.json'),
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          warnings: false,
          ie8: true,
          output: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        libs: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'libs',
        },
      },
    },
  },
};
