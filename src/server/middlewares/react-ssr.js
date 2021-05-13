import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../../client/router';
import routerList from '../../client/router/router-config';

export default (ctx, next) => {
  const path = ctx.request.path;
  const context = {};

  console.log('path: ', path);

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
        <script type='text/javascript' src="index.js"></script>
      </body>
    </html>
    `;

  return next();
};
