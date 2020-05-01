import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Spinner from '../../components/layout/Spinner';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading, loadCurrentUser } = useAuth();

  useEffect(() => {
    loadCurrentUser();
  }, []);

  if (loading) return <Spinner />;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect
            to={{ pathname: 'login', state: { referer: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
