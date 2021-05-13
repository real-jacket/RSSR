import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

function Layout(props) {
  return (
    <div>
      <Link to="/index">首页</Link>
      <Link to="/article">列表页</Link>
      <div>{props.children}</div>
    </div>
  );
}

export default withRouter(Layout);
