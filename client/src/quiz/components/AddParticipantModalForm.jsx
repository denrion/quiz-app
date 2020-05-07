import React from 'react';
import { useForm } from 'react-hook-form';
import { QUESTION_CATEGORIES } from '../../question/components/constants';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';

const AddParticipantModalForm = ({ showModal, toggleModal }) => {
  const { register, handleSubmit } = useForm();

  const onSubmitHandler = (formData) => {
    toggleModal();
  };

  return (
    <Modal
      show={showModal}
      onCancel={toggleModal}
      header='Add New Participant'
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
        <label htmlFor='participants'>Potential Participants</label>
        <select
          name='participants'
          id='participants'
          multiple
          ref={register}
          size='10'
        >
          {QUESTION_CATEGORIES.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </Modal>
  );
};

export default AddParticipantModalForm;
