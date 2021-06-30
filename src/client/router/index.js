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
        <Route to="*" component={Page404}></Route>
      </Switch>
    </Layout>
  );
}

export default App;
