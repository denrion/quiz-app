import React, { useContext } from 'react';
import { AlertContext } from '../../context/alert/AlertProvider';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type} text-center`}>
        <i className='fas fa-info-circle' /> {alert.message}
      </div>
    ))
  );
};

export default Alerts;
