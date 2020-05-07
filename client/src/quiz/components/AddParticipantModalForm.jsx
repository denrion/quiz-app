import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { QuizContext } from '../../context/quiz/QuizProvider';
import { UserContext } from '../../context/user/UserProvider';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';

const AddParticipantModalForm = ({ showModal, toggleModal }) => {
  const { getUsers, users } = useContext(UserContext);
  const { quiz, addParticipantsToQuiz } = useContext(QuizContext);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (!users)
      getUsers([
        { fieldName: 'role', value: 'PLAYER' },
        { fieldName: 'role', value: 'QUIZ_MASTER' },
      ]);

    // eslint-disable-next-line
  }, []);

  const onSubmitHandler = (formData) => {
    addParticipantsToQuiz(quiz.id, formData.participants);
    // toggleModal();
  };

  const filteredUsers =
    users &&
    users.filter(
      (user) =>
        !quiz.participants.some((participant) => user.id === participant.id)
    );

  return (
    <Modal
      show={showModal}
      onCancel={toggleModal}
      header='Add New Participant'
      footer={
        <>
          <Button onClick={toggleModal} color='danger' effect='inverse'>
            Cancel
          </Button>
          <Button
            type='submit'
            color='success'
            effect='inverse'
            disabled={filteredUsers && filteredUsers.length === 0}
          >
            Submit
          </Button>
        </>
      }
      footerClass='modal__actions'
      contentClass='form-container'
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className='form-group'>
        <label htmlFor='participants'>Potential Participants</label>
        <select
          name='participants'
          id='participants'
          multiple
          ref={register}
          size='10'
        >
          {filteredUsers &&
            filteredUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName}
              </option>
            ))}
        </select>
      </div>
    </Modal>
  );
};

export default AddParticipantModalForm;
