import React from 'react';
import { matchPath } from 'react-router';
import loadable from '@loadable/component';

function pageNotFound() {
  return <div>404页面</div>;
}

function Loading() {
  return <div>加载中...</div>;
}

export default [
  {
    path: '/',
    component: loadable(() => import('../page/index'), {
      fallback: <Loading />,
    }),
    exact: true,
  },
  {
    path: '/index',
    component: loadable(() => import('../page/index'), {
      fallback: <Loading />,
    }),
    exact: true,
  },
  {
    path: '/article',
    component: loadable(() => import('../page/list'), {
      fallback: <Loading />,
    }),
    exact: true,
  },
  {
    path: '*',
    component: pageNotFound,
    exact: true,
  },
];

export const matchRoute = (path, routeList) => {
  let route;
  for (let item of routeList) {
    if (matchPath(path, item)) {
      route = item;
      break;
    }
  }

  return route;
};
