import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../router/index';
import routerList from '../router/router-config';
import { loadableReady } from '@loadable/component';
import StyleContext from 'isomorphic-style-loader/StyleContext';

function clientRender() {
  // 获取初始化数据
  let initialData = JSON.parse(
    document.getElementById('ssrTextInitData').value
  );

  window.__INITIAL_DATA__ = initialData;

  // // 路由查找
  // let route = matchRoute(document.location.pathname, routerList);

  // // 设置路由初始化数据
  // if (route) {
  //   route.initialData = initialData;
  // }

  const insertCss = (...styles) => {
    // 客户端执行，插入 style
    const removeCss = styles.map((style) => style._insertCss());
    // 组件卸载时，移除当前 style 标签
    return () => removeCss.forEach((dispose) => dispose());
  };

  loadableReady(() => {
    ReactDOM.hydrate(
      <BrowserRouter>
        <StyleContext.Provider value={{ insertCss }}>
          <App routerList={routerList} />
        </StyleContext.Provider>
      </BrowserRouter>,
      document.getElementById('root')
    );
  });
}

// 渲染入口
clientRender();

// 开发环境才开启
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}
