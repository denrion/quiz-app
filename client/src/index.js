import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { AlertProvder } from './context/alert/AlertProvider.js';
import { AuthProvider } from './context/auth/AuthProvider.js';

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <AlertProvder>
      <App />
    </AlertProvder>
  </AuthProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
