const path = require('path');

module.exports = function (port, publicPath) {
  return {
    quiet: true,
    port,
    contentBase: path.resolve(__dirname, '../dist/static'),
    publicPath: publicPath,
    hot: true,
    progress: true,
    open: false,
    compress: true,
    watchContentBase: true,
    disableHostCheck: true, // 关闭Host检查
    writeToDisk: true,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 500,
      poll: 500,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
};
