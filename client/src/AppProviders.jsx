import React from 'react';
import { AlertProvder } from './context/alert/AlertProvider';
import { AuthProvider } from './context/auth/AuthProvider';
import { QuestionProvider } from './context/question/QuestionProvider';
import { QuizProvider } from './context/quiz/QuizProvider';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <AlertProvder>
        <QuestionProvider>
          <QuizProvider>{children}</QuizProvider>
        </QuestionProvider>
      </AlertProvder>
    </AuthProvider>
  );
};

export default AppProviders;
