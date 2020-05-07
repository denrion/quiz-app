import React from 'react';
import Button from '../../shared/components/FormElements/Button';

const MultipleChoiceAnswers = ({ activeQuestion }) => {
  return (
    <>
      <Button
        color='primary'
        size='big'
        style={{ width: '45%', margin: '1rem' }}
      >
        {activeQuestion.answerA}
      </Button>
      <Button
        color='primary'
        size='big'
        style={{ width: '45%', margin: '1rem' }}
      >
        {activeQuestion.answerB}
      </Button>
      <Button
        color='primary'
        size='big'
        style={{ width: '45%', margin: '1rem' }}
      >
        {activeQuestion.answerC}
      </Button>
      <Button
        color='primary'
        size='big'
        style={{ width: '45%', margin: '1rem' }}
      >
        {activeQuestion.answerD}
      </Button>
    </>
  );
};

const QuizActiveQuestion = ({ activeQuestion }) => {
  if (!activeQuestion) return <h2>No Question Selected</h2>;

  return (
    <>
      <div>
        <h2 className='my-3'>{activeQuestion.questionText}</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
          className='my-2'
        >
          {activeQuestion.type === 'MULTIPLE_CHOICE' ? (
            <MultipleChoiceAnswers activeQuestion={activeQuestion} />
          ) : (
            <textarea
              style={{ width: '90%', fontSize: '2.5rem' }}
              rows='5'
            ></textarea>
          )}
        </div>
        <Button
          color='success'
          size='big'
          display='block'
          style={{
            width: '90%',
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          Send question
        </Button>
      </div>
    </>
  );
};

export default QuizActiveQuestion;
