import { Route, Switch } from 'react-router-dom';
import Layout from '../app/layout';
import React from 'react';

function Page404() {
  return <div>404啦</div>;
}

function App({ routerList }) {
  return (
    <Layout>
      <Switch>
        {routerList.map((item) => (
          <Route key={item.path} {...item}></Route>
        ))}
        <Route to="*" component={Page404}></Route>
      </Switch>
    </Layout>
  );
}

export default App;
