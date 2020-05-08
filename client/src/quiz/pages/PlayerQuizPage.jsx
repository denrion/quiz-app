import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Card from '../../shared/components/UIElements/Card';
import { BASE_URL } from '../../utils/API';
import QuizActiveQuestion from '../components/QuizActiveQuestion';
import './PlayerQuizPage.scss';

const PlayerQuizPage = () => {
  const [activeQuestion, setActiveQuestion] = useState();
  const [socket, setSocket] = useState();

  // SOCKET CONNECTION HERE
  useEffect(() => {
    const socket = socketIOClient(BASE_URL);
    setSocket(socket);
  }, []);

  useEffect(() => {
    socket &&
      socket.on('activeQuestion', (question) => setActiveQuestion(question));
  }, [socket, activeQuestion]);

  return (
    <div className='player-quiz'>
      <Card className='player-quiz__question center'>
        {activeQuestion ? (
          <QuizActiveQuestion activeQuestion={activeQuestion} />
        ) : (
          <h2>Quizmaster is choosing a question. Please wait. :)</h2>
        )}
      </Card>
    </div>
  );
};

export default PlayerQuizPage;
