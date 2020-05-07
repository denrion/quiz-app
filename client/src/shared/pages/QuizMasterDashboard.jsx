import React, { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../../context/quiz/QuizProvider';
import useAuth from '../../hooks/useAuth';
import Questions from '../../question/components/Questions';
import QuizzesList from '../../quiz/components/QuizzesList';
import QuizzModalForm from '../../quiz/components/QuizzModalForm';
import Button from '../components/FormElements/Button';
import Spinner from '../components/UIElements/Spinner';
import './QuizMasterDashboard.scss';

const QuizMasterDashboard = () => {
  const { user } = useAuth();
  const { getQuizzes, loading, quizzes } = useContext(QuizContext);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    if (!quizzes)
      getQuizzes({
        fieldName: 'quizmaster',
        value: user.id,
      });

    // eslint-disable-next-line
  }, []);

  if (loading && !quizzes) return <Spinner />;

  return (
    <>
      <section className='my-3 quizzes'>
        <QuizzModalForm showModal={showModal} toggleModal={toggleModal} />

        <Button
          size='small'
          color='primary'
          shape='round'
          className='quizzes__btn-add'
          onClick={toggleModal}
        >
          <i className='fas fa-plus' />
        </Button>

        <QuizzesList quizzes={quizzes} />
      </section>

      <section className='my-3'>
        <Questions />
      </section>
    </>
  );
};

export default QuizMasterDashboard;
