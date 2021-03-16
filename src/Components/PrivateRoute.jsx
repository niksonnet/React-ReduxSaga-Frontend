import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import * as storage from '../LocalStorage/LocalStorage';

export const PrivateRoute = ({ component: Component, ...params }) => (
  <Route
    {...params}
    render={(props) =>
      storage.getLocalStorage(storage.USER_STORAGE_KEY) ? (
        <Component {...params} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);
