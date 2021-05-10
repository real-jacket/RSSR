import React from 'react';
import Index from '../../client/page/index';
import { renderToString } from 'react-dom/server';

export default (ctx, next) => {
  const html = renderToString(<Index />);

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
