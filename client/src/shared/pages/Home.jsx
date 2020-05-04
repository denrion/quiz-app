import React from 'react';
import useAuth from '../../hooks/useAuth';
import AdminDashboard from './AdminDashboard';
import PlayerDashboard from './PlayerDashboard';
import QuizMasterDashboard from './QuizMasterDashboard';

const Home = () => {
  const { user } = useAuth();

  if (user.role === 'ADMIN') return <AdminDashboard />;
  else if (user.role === 'QUIZ_MASTER') return <QuizMasterDashboard />;
  else return <PlayerDashboard />;
};

export default Home;
