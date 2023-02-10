import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import shortid from 'shortid';
import flatten from 'lodash/flatten';
import Layout from 'containers/Layout';
import PersonalLayout from 'containers/PersonalLayout';
import { isAuthenticated } from 'utils/auth';
import allRoutes, {
  personalRoutes,
  mobileRoutes,
  mobileTabsRoutes,
  otherRoutes,
} from 'routers/routes';
import { path } from './path';

const requiredAuth = privateRouter => {
  if (!privateRouter) return true;
  return isAuthenticated();
};

const RouteItem = route => {
  const { component: Component } = route;
  return (
    <Route
      key={shortid.generate()}
      path={route.path}
      exact
      render={props =>
        requiredAuth(route.private) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );
};

const childRoutes = routes => {
  const result = routes.map(item =>
    item.children
      ? item.children.map(childItem => RouteItem(childItem))
      : RouteItem(item),
  );
  return flatten(result);
};

const WebRouters = () => (
  <Switch>
    {childRoutes(otherRoutes)}
    <Route path={path.account}>
      <PersonalLayout>
        <Switch>
          {childRoutes(personalRoutes)}
          <Redirect to={path.notFound} />
        </Switch>
      </PersonalLayout>
    </Route>
    <Layout>
      <Switch>
        {childRoutes(allRoutes)}
        <Redirect to={path.notFound} />
      </Switch>
    </Layout>
  </Switch>
);

const AppTabsRouters = childRoutes(mobileTabsRoutes);

const AppRouters = childRoutes(mobileRoutes);

export { WebRouters, AppTabsRouters, AppRouters };
