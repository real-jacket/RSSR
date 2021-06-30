const { webpack } = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clientConfig = require('../webpack.dev.config');
const getWdsConfig = require('../webpack-dev-server.config');
const { wdsPort } = require('../../src/share/pro-config');
const chalk = require('chalk');

function getWebpackCompiler() {
  return webpack(clientConfig);
}

function createWdsServer(port) {
  let compiler = getWebpackCompiler();

  compiler.hooks.done.tap('done', function (data) {
    console.log('\n wds server compile done');
  });

  return new WebpackDevServer(
    compiler,
    getWdsConfig(port, clientConfig.output.publicPath)
  );
}

function runWdsServer() {
  let devServer = createWdsServer(wdsPort);

  devServer.listen(wdsPort, 'localhost', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.cyan('Staring the development node server...\n'));

    console.log('🚀 started');
  });
}

runWdsServer();
