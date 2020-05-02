import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { AlertProvder } from './context/alert/AlertProvider.js';
import { AuthProvider } from './context/auth/AuthProvider.js';
import { QuizProvider } from './context/quiz/QuizProvider.js';

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <AlertProvder>
      <QuizProvider>
        <App />
      </QuizProvider>
    </AlertProvder>
  </AuthProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
