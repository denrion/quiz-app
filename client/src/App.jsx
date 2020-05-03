import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Spinner from './components/layout/Spinner';
import PrivateRoute from './components/routing/PrivateRoute';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
  const { loadCurrentUser, loading, token } = useAuth();

  useEffect(() => {
    if (!!token) loadCurrentUser();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <Router>
      <>
        <Navbar />
        <div className='container'>
          <Alerts />
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </>
    </Router>
  );
};

export default App;
