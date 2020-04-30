import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';
import { AlertProvder } from './context/alert/AlertProvider';
import { AuthProvider } from './context/auth/AuthProvider';
import About from './pages/About';
import Home from './pages/Home';

const App = () => {
  return (
    <AuthProvider>
      <AlertProvder>
        <Router>
          <>
            <Navbar />
            <div className='container'>
              <Alerts />
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </div>
          </>
        </Router>
      </AlertProvder>
    </AuthProvider>
  );
};

export default App;
