// 获取本机 ip
const localIp = process.argv[process.argv.length - 1] || 'localhost';
global.__LOCAL_IP__ = localIp;

const { webpack } = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clientConfig = require('../webpack.dev.config');
const getWdsConfig = require('../webpack-dev-server.config');
const proConfig = require('../../src/share/pro-config');
const chalk = require('chalk');
const open = require('./open-browser.js');

let compilationTime = 0; //编译次数

const WDS_PORT = proConfig.wdsPort; //wds 服务端口

const NODE_SERVER_PORT = proConfig.nodeServerPort; //node 服务端口

function getWebpackCompiler() {
  return webpack(clientConfig);
}

function createWdsServer(port) {
  let compiler = getWebpackCompiler();

  compiler.hooks.done.tap('done', function (data) {
    console.log('\n wds server compile done');
    if (compilationTime === 0) {
      open(`http://${localIp}:${NODE_SERVER_PORT}`);
    }
    compilationTime++;
  });

  return new WebpackDevServer(
    compiler,
    getWdsConfig(port, clientConfig.output.publicPath)
  );
}

function runWdsServer() {
  let devServer = createWdsServer(WDS_PORT);

  devServer.listen(WDS_PORT, localIp, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.cyan('Staring the development node server...\n'));

    console.log('🚀 started');
  });
}

runWdsServer();
