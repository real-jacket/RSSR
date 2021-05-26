import { Route, Switch } from 'react-router-dom';
import Layout from '../app/layout';
import React from 'react';

function App({ routerList }) {
  return (
    <Layout>
      <Switch>
        {routerList.map((item) => {
          return item.initialData ? (
            <Route
              key={item.path}
              path={item.path}
              exact={item.exact}
              render={(props) => {
                props.initialData = item.initialData;
                return <item.component {...props} />;
              }}
            ></Route>
          ) : (
            <Route key={item.path} {...item}></Route>
          );
        })}
      </Switch>
    </Layout>
  );
}

export default App;
