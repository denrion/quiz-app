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

  const [socket, setSocket] = useState();
  const [playerAnswers, setPlayerAnswers] = useState([]);

  useEffect(() => {
    getQuiz(quizId);

    // Establish socket connection on page load
    const socket = socketIOClient(BASE_URL);
    setSocket(socket);

    // eslint-disable-next-line
  }, []);

  // Listen for sendAnswerToQuizmaster
  useEffect(() => {
    socket &&
      socket.on('sendAnswerToQuizmaster', (answer) =>
        setPlayerAnswers((playerAnswers) => [...playerAnswers, answer])
      );
  }, [socket]);

  const onSendQuestionToPlayersHanlder = () => {
    const { answer, createdAt, ...questionForPlayer } = activeQuestion;
    socket && socket.emit('showQuestionToPlayer', questionForPlayer);
  };

  if (loading || !quiz) return <Spinner />;

  return (
    <>
      <div className='quiz'>
        <Card className='quiz__active-question'>
          <QuizActiveQuestion
            activeQuestion={activeQuestion}
            sendQuestionToPlayers={onSendQuestionToPlayersHanlder}
          />
        </Card>
        <Card className='quiz__questions'>
          {quiz.questions && <QuizQuestionsList questions={quiz.questions} />}
        </Card>
        <Card className='quiz__stats'>
          <h1>Stats go here</h1>
          <ul>
            {playerAnswers &&
              playerAnswers.map((playerAnswer) => (
                <li>
                  <span style={{ fontWeight: 'bold' }}>
                    {playerAnswer.user.displayName}
                  </span>
                  : {playerAnswer.answer}
                </li>
              ))}
          </ul>
        </Card>
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
