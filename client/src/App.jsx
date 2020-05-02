import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import QuizMasterDashboard from './components/QuizMasterDashboard';
import NotFound from './components/routing/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import Home from './pages/Home';

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
