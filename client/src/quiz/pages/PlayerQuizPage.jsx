import React, { useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import QuizActiveQuestion from '../components/QuizActiveQuestion';
import './PlayerQuizPage.scss';

const PlayerQuizPage = () => {
  const [activeQuestion, setActiveQuestion] = useState();

  // SOCKET CONNECTION HERE

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
