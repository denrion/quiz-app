import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Spinner from '../../components/layout/Spinner';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated, loading, loadCurrentUser, user } = useAuth();

  useEffect(() => {
    loadCurrentUser();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  console.log('here');
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
