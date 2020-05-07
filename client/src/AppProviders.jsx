import React from 'react';
import { AlertProvder } from './context/alert/AlertProvider';
import { AuthProvider } from './context/auth/AuthProvider';
import { QuestionProvider } from './context/question/QuestionProvider';
import { QuizProvider } from './context/quiz/QuizProvider';
import { UserProvider } from './context/user/UserProvider';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <AlertProvder>
        <UserProvider>
          <QuestionProvider>
            <QuizProvider>{children}</QuizProvider>
          </QuestionProvider>
        </UserProvider>
      </AlertProvder>
    </AuthProvider>
  );
};

export default AppProviders;
