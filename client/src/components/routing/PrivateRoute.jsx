import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return (
            <Redirect
              to={{ pathname: 'login', state: { referer: props.location } }}
            />
          );
        }

        if (roles && roles.indexOf(user.role) === -1) {
          return <Redirect to={{ pathname: '/' }} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
