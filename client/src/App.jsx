import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import { AuthProvider } from './context/auth/AuthProvider';
import About from './pages/About';
import Home from './pages/Home';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </div>
        </>
      </Router>
    </AuthProvider>
  );
};

export default App;
