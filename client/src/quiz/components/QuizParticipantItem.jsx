import React from 'react';

const QuizParticipantItem = ({ participant, ...otherProps }) => {
  return <li {...otherProps}>{participant.displayName}</li>;
};

export default QuizParticipantItem;
