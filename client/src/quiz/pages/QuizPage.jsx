import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QuizContext } from '../../context/quiz/QuizProvider';
import useAuth from '../../hooks/useAuth';
import Card from '../../shared/components/UIElements/Card';
import Spinner from '../../shared/components/UIElements/Spinner';
import QuizActiveQuestion from '../components/QuizActiveQuestion';
import QuizParticipantsList from '../components/QuizParticipantsList';
import QuizQuestionsList from '../components/QuizQuestionsList';
import PlayerQuizPage from './PlayerQuizPage';
import './QuizPage.scss';

const QuizPage = () => {
  const { user } = useAuth();

  const { getQuiz, loading, quiz, activeQuestion } = useContext(QuizContext);
  const { quizId } = useParams();

  useEffect(() => {
    getQuiz(quizId);
    // eslint-disable-next-line
  }, []);

  if (user.role === 'PLAYER') return <PlayerQuizPage />;
  if (loading || !quiz) return <Spinner />;

  return (
    <>
      <div className='quiz'>
        <Card className='quiz__active-question'>
          <QuizActiveQuestion activeQuestion={activeQuestion} />
        </Card>
        <Card className='quiz__questions'>
          {quiz.questions && <QuizQuestionsList questions={quiz.questions} />}
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
