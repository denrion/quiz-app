import React from 'react';
import { AlertProvder } from './context/alert/AlertProvider';
import { AuthProvider } from './context/auth/AuthProvider';
import { QuizProvider } from './context/quiz/QuizProvider';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <AlertProvder>
        <QuizProvider>{children}</QuizProvider>
      </AlertProvder>
    </AuthProvider>
  );
};

export default AppProviders;
