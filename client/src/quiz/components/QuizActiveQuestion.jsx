import React, { useContext, useState } from 'react';
import { QuizContext } from '../../context/quiz/QuizProvider';
import useAuth from '../../hooks/useAuth';
import Button from '../../shared/components/FormElements/Button';
import './QuizActiveQuestion.scss';

const MultipleChoiceAnswers = ({ activeQuestion, user, setAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState();

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setAnswer(answer);
  };

  return (
    <div className='active-question__multiple-choice'>
      <Button
        color='primary'
        size='big'
        style={{ width: '45%', margin: '1rem' }}
        value={activeQuestion.answerA}
        onClick={(e) => handleAnswer(e.target.value)}
        disabled={user.role === 'QUIZMASTER'}
        className={selectedAnswer === activeQuestion.answerA ? 'active' : ''}
      >
        {activeQuestion.answerA}
      </Button>
      <Button
        color='primary'
        size='big'
        style={{ width: '45%', margin: '1rem' }}
        value={activeQuestion.answerB}
        onClick={(e) => handleAnswer(e.target.value)}
        disabled={user.role === 'QUIZMASTER'}
        className={selectedAnswer === activeQuestion.answerB ? 'active' : ''}
      >
        {activeQuestion.answerB}
      </Button>
      <Button
        color='primary'
        size='big'
        style={{ width: '45%', margin: '1rem' }}
        value={activeQuestion.answerC}
        onClick={(e) => handleAnswer(e.target.value)}
        disabled={user.role === 'QUIZMASTER'}
        className={selectedAnswer === activeQuestion.answerC ? 'active' : ''}
      >
        {activeQuestion.answerC}
      </Button>
      <Button
        color='primary'
        size='big'
        style={{ width: '45%', margin: '1rem' }}
        value={activeQuestion.answerD}
        onClick={(e) => handleAnswer(e.target.value)}
        disabled={user.role === 'QUIZMASTER'}
        className={selectedAnswer === activeQuestion.answerD ? 'active' : ''}
      >
        {activeQuestion.answerD}
      </Button>
    </div>
  );
};

const QuizActiveQuestion = ({
  activeQuestion,
  sendQuestionToPlayers,
  sendAnswerToQuizmaster,
}) => {
  const { user } = useAuth();
  const { setActiveQuestion } = useContext(QuizContext);

  const [answer, setAnswer] = useState('');

  const onButtonClickHandler = () => {
    if (user.role === 'QUIZMASTER') sendQuestionToPlayers();
    if (user.role === 'PLAYER') sendAnswerToQuizmaster(answer);
    setAnswer('');
    setActiveQuestion(null);
  };

  if (!activeQuestion)
    return user.role === 'PLAYER' ? (
      <h2 style={{ margin: '5rem' }}>
        The Quizmaster is choosing a question. Please wait{' '}
        <span role='img' aria-label='smile'>
          😊
        </span>
      </h2>
    ) : (
      <h2>No Question Selected</h2>
    );

  const userSubmittedAQuestion = activeQuestion.submittedBy.id === user.id;

  return (
    <>
      <div className='active-question'>
        <h2 className='my-2'>{activeQuestion.questionText}</h2>

        {activeQuestion && userSubmittedAQuestion ? (
          <h4 className='center my-2'>
            Unfortunately, you cannot answer this question because you were the
            one who submitted it. Thank you for your questions ❤
          </h4>
        ) : (
          <>
            {activeQuestion.type === 'MULTIPLE_CHOICE' ? (
              <MultipleChoiceAnswers
                activeQuestion={activeQuestion}
                user={user}
                setAnswer={setAnswer}
              />
            ) : (
              <textarea
                rows='8'
                className='active-question__text-answer'
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={user.role === 'QUIZMASTER'}
              ></textarea>
            )}
          </>
        )}

        <div className='active-question__btn-wrapper'>
          <Button
            color='success'
            size='big'
            display='block'
            style={{ marginRight: '0' }}
            onClick={onButtonClickHandler}
            disabled={
              user.role === 'PLAYER' && !userSubmittedAQuestion && answer === ''
            }
          >
            {user.role === 'PLAYER'
              ? activeQuestion && userSubmittedAQuestion
                ? 'Continue'
                : 'Submit answer'
              : 'Send question'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuizActiveQuestion;
