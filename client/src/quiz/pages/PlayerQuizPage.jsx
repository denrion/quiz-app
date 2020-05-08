import React, { useContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { QuizContext } from '../../context/quiz/QuizProvider';
import useAuth from '../../hooks/useAuth';
import Card from '../../shared/components/UIElements/Card';
import { BASE_URL } from '../../utils/API';
import QuizActiveQuestion from '../components/QuizActiveQuestion';
import './PlayerQuizPage.scss';

const PlayerQuizPage = () => {
  const { user } = useAuth();
  const { setActiveQuestion, activeQuestion } = useContext(QuizContext);

  const [socket, setSocket] = useState();

  // Establish socket connection on page load
  useEffect(() => {
    const socket = socketIOClient(BASE_URL);
    setSocket(socket);

    // eslint-disable-next-line
  }, []);

  // Listen for ShowQuestionToPlayer
  useEffect(() => {
    socket &&
      socket.on('showQuestionToPlayer', (question) =>
        setActiveQuestion(question)
      );
  }, [socket]);

  const onSendAnswerToQuizmasterHandler = (answer) => {
    const answerForQuizMaster = { answer, user };
    socket.emit('sendAnswerToQuizmaster', answerForQuizMaster);
  };

  return (
    <div className='player-quiz'>
      <Card className='player-quiz__question center'>
        <QuizActiveQuestion
          activeQuestion={activeQuestion}
          sendAnswerToQuizmaster={onSendAnswerToQuizmasterHandler}
        />
      </Card>
    </div>
  );
};

export default PlayerQuizPage;
