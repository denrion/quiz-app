import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { QuizContext } from '../../context/quiz/QuizProvider';
import Card from '../../shared/components/UIElements/Card';
import Spinner from '../../shared/components/UIElements/Spinner';
import { BASE_URL } from '../../utils/API';
import QuizActiveQuestion from '../components/QuizActiveQuestion';
import QuizParticipantsList from '../components/QuizParticipantsList';
import QuizQuestionsList from '../components/QuizQuestionsList';
import './QuizPage.scss';

const QuizPage = () => {
  const { getQuiz, loading, quiz, activeQuestion } = useContext(QuizContext);
  const { quizId } = useParams();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    getQuiz(quizId);
    // eslint-disable-next-line
  }, []);

  // Establish a socket connection
  useEffect(() => {
    const socket = socketIOClient(BASE_URL);
    setSocket(socket);
  }, []);

  // if (user.role === 'PLAYER') return <PlayerQuizPage />;
  if (loading || !quiz) return <Spinner />;

  return (
    <>
      <div className='quiz'>
        <Card className='quiz__active-question'>
          <QuizActiveQuestion activeQuestion={activeQuestion} />
        </Card>
        <Card className='quiz__questions'>
          {quiz.questions && (
            <QuizQuestionsList questions={quiz.questions} socket={socket} />
          )}
        </Card>
        <Card className='quiz__stats'>Stats go here</Card>
        <Card className='quiz__participants'>
          {quiz.participants && (
            <QuizParticipantsList participants={quiz.participants} />
          )}
        </Card>
      </div>
    </>
  );
};

export default QuizPage;
