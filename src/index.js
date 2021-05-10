import React from 'react';
import * as http from 'http';
import ReactDOMServer from 'react-dom/server.js';

function Index() {
  return <h1>hello react ssr</h1>;
}

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    const html = ReactDOMServer.renderToString(<Index></Index>);

    res.end(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>传统 ssr</title>
      </head>
      <body>
        <div id="root>
          ${html}
        </div>
      </body>
    </html>
  `);
  })
  .listen(9001);
