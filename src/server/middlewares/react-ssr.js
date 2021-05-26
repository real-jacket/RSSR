import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../../client/router';
import routerList, { matchRoute } from '../../client/router/router-config';

export default async (ctx, next) => {
  const path = ctx.request.path;

  // 查找到的目标路由对象
  let targetRoute = matchRoute(path, routerList);

  // 数据预取 -> fetchResult
  let fetchDAtaFn = targetRoute.component.getInitialProps;

  let fetchResult = {};
  if (fetchDAtaFn) {
    fetchResult = await fetchDAtaFn();
  }

  // 将预取数据放在这里传递过去 组内通过 props.staticContext 获取
  const context = {
    initialData: fetchResult,
  };

  const html = renderToString(
    <StaticRouter location={path} context={context}>
      <App routerList={routerList}></App>
    </StaticRouter>
  );

  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>react ssr</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <textarea id="ssrTextInitData" style="display:none;">
        ${JSON.stringify(fetchResult)}
        </textarea>
        <script type='text/javascript' src="index.js"></script>
      </body>
    </html>
    `;

  return next();
};
