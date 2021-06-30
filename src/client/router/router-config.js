import { matchPath } from 'react-router';
import Index from '../page/index';
import List from '../page/list';

function pageNotFound() {
  return <div>404页面</div>;
}

export default [
  {
    path: '/',
    component: Index,
    exact: true,
  },
  {
    path: '/index',
    component: Index,
    exact: true,
  },
  {
    path: '/article',
    component: List,
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
