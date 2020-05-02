import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const LOCAL_STORAGE_KEY = 'auth.user'
  let user = localStorage.getItem(LOCAL_STORAGE_KEY);
  user = JSON.parse(user);
  return (
    <Route
      {...rest}
      render={props => {
        if (user !== null) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/signin',
                // state: {
                //   from: props.location
                // }
              }}
            />
          );
        }
      }}
    />
  );
};
