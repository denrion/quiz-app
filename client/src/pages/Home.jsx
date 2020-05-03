import React from 'react';
import SubmitQuestion from '../components/quiz/SubmitQuestion';
import useAuth from '../hooks/useAuth';
import AdminDashboard from './AdminDashboard';
import QuizMasterDashboard from './QuizMasterDashboard';

const Home = () => {
  const { user } = useAuth();

  if (user.role === 'ADMIN') return <AdminDashboard />;
  else if (user.role === 'QUIZ_MASTER') return <QuizMasterDashboard />;
  else return <SubmitQuestion />;
};

export default Home;
