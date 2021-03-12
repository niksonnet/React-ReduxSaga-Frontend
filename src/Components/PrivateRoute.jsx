import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getUser } from '../LocalStorage/LocalStorage';

export const PrivateRoute = ({ component: Component, ...params }) => (
  <Route
    {...params}
    render={(props) =>
      getUser('user') ? (
        <Component {...params} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);
