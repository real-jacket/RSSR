import React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router';
import App from '../../client/router';
import routerList, { matchRoute } from '../../client/router/router-config';
import { ChunkExtractor } from '@loadable/server';
import * as path from 'path';
import proConfig from '../../share/pro-config';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import getStore from '../../share/redux/store.js';
import { Provider } from 'react-redux';

// // 导入资源处理库
// const getAssets = require('../common/asset');

// // 绑定资源
// const assetMap = getAssets();

// This is the stats file generated by webpack loadable plugin
// const statsFile = path.resolve(__dirname, './loadable-stats.json');
// // We create an extractor from the statsFile
// const extractor = new ChunkExtractor({ statsFile });

// This is the stats file generated by webpack loadable plugin
const webStatsFile = path.resolve(__dirname, '../static/loadable-stats.json');
// We create an extractor from the statsFile
const webExtractor = new ChunkExtractor({
  statsFile: webStatsFile,
});

export default async (ctx, next) => {
  const path = ctx.request.path;

  if (path.indexOf('.') > -1) {
    // ctx.body = null;
    return next();
  }

  let html = '',
    css = new Set(),
    styles = [],
    fetchDAtaFn,
    fetchResult = {},
    store;

  const insertCss = (...styles) =>
    styles.forEach((style) => css.add(style._getContent()));

  if (proConfig.__IS_SSR__) {
    // 查找到的目标路由对象
    let targetRoute = matchRoute(path, routerList);

    store = getStore();

    // 数据预取 -> fetchResult
    // 注意： 懒加载后路由数据结构发生了变化，需要主要 load 来获取正确的方法，这个地方数据的获取需要再优化一下
    if (targetRoute) {
      fetchDAtaFn =
        (await targetRoute.component.load()).default.getInitialProps || null;
      if (fetchDAtaFn) {
        fetchResult = await fetchDAtaFn({ store });
      }
    }

    // 将预取数据放在这里传递过去 组内通过 props.staticContext 获取
    const context = {};

    let { page } = fetchResult || {};

    let tdk = {
      title: '默认标题',
      keywords: '默认关键词',
      description: '默认描述',
    };

    if (page && page.tdk) {
      tdk = {
        ...tdk,
        ...page.tdk,
      };
    }

    const jsx = webExtractor.collectChunks(
      <Provider store={store}>
        <StaticRouter location={path} context={context}>
          <StyleContext.Provider value={{ insertCss }}>
            <App routerList={routerList} />
          </StyleContext.Provider>
        </StaticRouter>
      </Provider>
    );

    html = renderToString(jsx);

    [...css].forEach((item) => {
      let [mid, content] = item[0];
      styles.push(`<style id="s${mid}-0" >${content}</style>`);
    });
  }

  const helmet = Helmet.renderStatic();

  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${webExtractor.getStyleTags()}
        ${styles.join('')}
      </head>
      <body>
        <div id="root">${html}</div>
        <textarea id="ssrTextInitData" style="display:none;">
        ${JSON.stringify(proConfig.__IS_SSR__ ? store.getState() : fetchResult)}
        </textarea>
      </body>
      <script>
      window.__IS_SSR__=${proConfig.__IS_SSR__}
      </script>
      ${webExtractor.getScriptTags()}
    </html>
    `;

  return next();
};
