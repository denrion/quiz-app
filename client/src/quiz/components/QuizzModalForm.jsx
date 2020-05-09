import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { QuizContext } from '../../context/quiz/QuizProvider';
import { UserContext } from '../../context/user/UserProvider';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';

const QuizzModalForm = ({ showModal, toggleModal }) => {
  const { createQuiz } = useContext(QuizContext);
  const { getUsers, users } = useContext(UserContext);

  const { register, handleSubmit, errors } = useForm();

  const onSubmitHandler = (formData) => {
    createQuiz(formData);
    toggleModal();
  };

  useEffect(() => {
    if (!users) getUsers([{ fieldName: 'role', value: 'PLAYER' }]);
    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      show={showModal}
      onCancel={toggleModal}
      header='Create New Quizz'
      footer={
        <>
          <Button onClick={toggleModal} color='danger' effect='inverse'>
            Cancel
          </Button>{' '}
          <Button type='submit' color='success' effect='inverse'>
            Submit
          </Button>
        </>
      }
      footerClass='modal__actions'
      contentClass='form-container'
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className='form-group'>
        <label htmlFor='name'>Quizz Name</label>
        <input
          type='text'
          name='name'
          id='name'
          className={errors.name && 'has-error'}
          ref={register({
            required: 'This field is required',
          })}
        />
        {errors.name && <span className='is-error'>{errors.name.message}</span>}
      </div>
      <div className='form-group'>
        <label htmlFor='participants'>Participants</label>
        <select
          name='participants'
          id='participants'
          multiple
          ref={register}
          size='10'
        >
          {users &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName}
              </option>
            ))}
        </select>
      </div>
    </Modal>
  );
};

export default QuizzModalForm;
