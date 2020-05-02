import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import QuizMasterDashboard from './pages/QuizMasterDashboard';

const App = () => {
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
            <PrivateRoute
              exact
              path='/admin'
              roles='ADMIN'
              component={AdminDashboard}
            />
            <PrivateRoute
              exact
              path='/quizmaster'
              roles='QUIZ_MASTER'
              component={QuizMasterDashboard}
            />

            <Route component={NotFound} />
          </Switch>
        </div>
      </>
    </Router>
  );
};

export default App;
