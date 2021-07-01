const { spawn } = require('child_process');
const constantCode = require('./constant');
const chalk = require('chalk');
const log = console.log;
const proConfig = require('../../src/share/pro-config');

const nodeServerPort = proConfig.nodeServerPort;

log(chalk.red('servers starting....'));

// 前端代码构建 服务进程
// const feCodeWatchProcess = spawn('npm', ['run', 'fe:watch'], {
const feCodeWatchProcess = spawn('npm', ['run', 'wds:watch'], {
  shell: process.platform === 'win32',
});

let wdsDone = false;
let svrDone = false;

feCodeWatchProcess.stdout.on('data', (data) => {
  let str = data.toString();
  if (str.indexOf('wds server compile done') > -1) {
    wdsDone = true;
    if (wdsDone && svrDone) {
      startNodeServer();
    }
  } else {
    console.log(str);
  }
});

//服务端代码监控和编译进程
const svrCodeWatchProcess = spawn('npm', ['run', 'svr:watch'], {
  shell: process.platform === 'win32',
});

svrCodeWatchProcess.stdout.on('data', (data) => {
  let str = data.toString();
  if (str.indexOf(constantCode.SVRCODECOMPLETED) > -1) {
    svrDone = true;
    if (wdsDone && svrDone) {
      startNodeServer();
    }
  } else {
    console.log(str);
  }
});

let nodeServerProcess = null;

const startNodeServer = () => {
  nodeServerProcess && nodeServerProcess.kill();
  nodeServerProcess = spawn('node', ['./webpack/scripts/svr-dev-server.js'], {
    shell: process.platform === 'win32',
  });
  nodeServerProcess.stdout.on('data', print);
};

function print(data) {
  let str = data.toString();
  console.log(str);
}

const killChild = () => {
  svrCodeWatchProcess && svrCodeWatchProcess.kill();
  nodeServerProcess && nodeServerProcess.kill();
  feCodeWatchProcess && feCodeWatchProcess.kill();
};

process.on('close', (code) => {
  console.log('main process close', code);
  killChild();
});

process.on('exit', (code) => {
  console.log('main process exit', code);
  killChild();
});

process.on('SIGINT', function () {
  svrCodeWatchProcess.stdin.write('exit', (error) => {
    console.log('svr code watcher process exit');
  });

  killChild();
});
