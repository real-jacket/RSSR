import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './layout.scss';

function Layout(props) {
  return (
    <div className="layout-box">
      <h1>koa-react-ssr</h1>
      <Link to="/index">首页</Link>
      <Link to="/article">列表页</Link>
      <div className="page-index-box">{props.children}</div>
    </div>
  );
}

export default withRouter(Layout);
