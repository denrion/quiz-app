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
import PlayerQuizPage from './quiz/pages/PlayerQuizPage';
import QuizPage from './quiz/pages/QuizPage';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import PrivateRoute from './shared/components/Routing/PrivateRoute';
import Alerts from './shared/components/UIElements/Alerts';
import FullPageSpinner from './shared/components/UIElements/FullPageSpinner';
import Home from './shared/pages/Home';

const App = () => {
  const { loadCurrentUser, loading, token } = useAuth();

  useEffect(() => {
    if (!!token) loadCurrentUser();
    // eslint-disable-next-line
  }, []);

  if (loading) return <FullPageSpinner />;

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
            <PrivateRoute
              exact
              path='/quizzes/:quizId'
              roles='QUIZ_MASTER, PLAYER'
              component={QuizPage}
            />
            <Route
              exact
              path='/quizzes/:quizId/:playerId'
              component={PlayerQuizPage}
            />
            <Redirect to='/' />
          </Switch>
        </div>
      </main>
    </Router>
  );
};

export default App;
