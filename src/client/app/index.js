import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../router/index';
import routerList, { matchRoute } from '../router/router-config';
import './index.css';
import { loadableReady } from '@loadable/component';

function clientRender() {
  // 获取初始化数据
  let initialData = JSON.parse(
    document.getElementById('ssrTextInitData').value
  );

  // 路由查找
  let route = matchRoute(document.location.pathname, routerList);

  // 设置路由初始化数据
  if (route) {
    route.initialData = initialData;
  }

  loadableReady(() => {
    ReactDOM.hydrate(
      <BrowserRouter>
        <App routerList={routerList} />
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
