import React from 'react';
import Spinner from './Spinner';

const FullPageSpinner = () => {
  return (
    <div
      style={{
        fontSize: '4rem',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  );
};

export default FullPageSpinner;
