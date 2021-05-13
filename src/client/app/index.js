import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../router/index';
import routerList from '../router/router-config';

ReactDOM.hydrate(
  <BrowserRouter basename="/">
    <App routerList={routerList} />
  </BrowserRouter>,
  document.getElementById('root')
);
