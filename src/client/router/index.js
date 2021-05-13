import { Route, Switch } from 'react-router-dom';
import Layout from '../app/layout';
import React from 'react';

function App({ routerList }) {
  return (
    <Layout>
      <Switch>
        {routerList.map((item) => (
          <Route key={item.path} {...item}></Route>
        ))}
      </Switch>
    </Layout>
  );
}

export default App;
