import React from 'react';

const Question = (data) => {
  const {
    id,
    type,
    category,
    submittedBy,
    createdAt,
    ...questionData
  } = data.data;

  return (
    <div style={{ marginLeft: '100px' }}>
      {' '}
      <pre>{JSON.stringify(questionData, null, 2)}</pre>
    </div>
  );
};

export default Question;
