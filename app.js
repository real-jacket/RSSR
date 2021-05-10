const reactSsr = require('./dist/src/server/middlewares/react-ssr').default;
const Koa = require('koa2');
const koaStatic = require('koa-static');
const path = require('path');

const app = new Koa();

app.use(koaStatic(path.join(__dirname, './dist/static')));

app.use(reactSsr);

app.listen(9001, function () {
  console.log('server is start : 9001');
});
