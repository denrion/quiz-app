import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import AppProviders from './AppProviders.jsx';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);
