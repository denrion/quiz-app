import React from 'react';
import './Spinner.scss';

const Spinner = () => (
  <div
    style={{
      margin: 'auto',
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
