import React from 'react';
import './Spinner.scss';

const Spinner = () => (
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
    <div className='spinner' style={{ padding: '24px' }}></div>
  </div>
);

export default Spinner;
