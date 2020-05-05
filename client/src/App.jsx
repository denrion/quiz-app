import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';
import Login from './auth/pages/Login';
import Register from './auth/pages/Register';
import useAuth from './hooks/useAuth';
import SubmitQuestion from './question/pages/SubmitQuestion';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import PrivateRoute from './shared/components/Routing/PrivateRoute';
import Alerts from './shared/components/UIElements/Alerts';
import Spinner from './shared/components/UIElements/Spinner';
import Home from './shared/pages/Home';

const App = () => {
  const { loadCurrentUser, loading, token } = useAuth();

  useEffect(() => {
    if (!!token) loadCurrentUser();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <Router>
      <MainNavigation />
      <main>
        <div className='container'>
          <Alerts />
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute
              exact
              path='/questions/new'
              component={SubmitQuestion}
            />
            <Redirect to='/' />
          </Switch>
        </div>
      </main>
    </Router>
  );
};

export default App;
