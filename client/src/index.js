import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { AlertProvder } from './context/alert/AlertProvider.js';
import { AuthProvider } from './context/auth/AuthProvider.js';
import { QuizzProvider } from './context/quizz/QuizzProvider.js';

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <AlertProvder>
      <QuizzProvider>
        <App />
      </QuizzProvider>
    </AlertProvder>
  </AuthProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
