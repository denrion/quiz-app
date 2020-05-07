import React, { useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import AddParticipantModalForm from './AddParticipantModalForm';
import QuizParticipantItem from './QuizParticipantItem';

const QuizParticipantsList = ({ participants }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <ul>
        {participants &&
          participants.map((participant) => (
            <QuizParticipantItem
              key={participant.id}
              participant={participant}
            />
          ))}
      </ul>

      <AddParticipantModalForm
        showModal={showModal}
        toggleModal={toggleModal}
      />

      <Button display='block' color='primary' onClick={toggleModal}>
        Add Participant
      </Button>
    </>
  );
};

export default QuizParticipantsList;
