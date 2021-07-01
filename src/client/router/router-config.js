import React from 'react';
import { matchPath } from 'react-router';
import loadable from '@loadable/component';

function pageNotFound() {
  return <div>404页面</div>;
}

function Loading() {
  return <div>加载中...</div>;
}

const routerList = [
  {
    path: '/',
    component: loadable(
      () => import(/* webpackPrefetch: true */ '../page/index'),
      {
        fallback: <Loading />,
      }
    ),
    exact: true,
  },
  {
    path: '/index',
    component: loadable(
      () => import(/* webpackPrefetch: true */ '../page/index'),
      {
        fallback: <Loading />,
      }
    ),
    exact: true,
  },
  {
    path: '/article',
    component: loadable(
      () => import(/* webpackPrefetch: true */ '../page/list'),
      {
        fallback: <Loading />,
      }
    ),
    exact: true,
  },
  {
    path: '*',
    component: pageNotFound,
    exact: true,
  },
];

export default routerList;

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
