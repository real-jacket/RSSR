import Index from '../page/index';
import List from '../page/list';

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
];
