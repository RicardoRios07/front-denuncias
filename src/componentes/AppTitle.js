import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';

const AppTitle = () => {
  return (
    <div className="card bg-primary text-white mb-3">
      <div className="card-body">
        <h1 className="card-title text-center">
          <FontAwesomeIcon icon={faGaugeHigh} size="2x" className="mr-2" />
          Corruptómetro
        </h1>
      </div>
    </div>
  );
}

export default AppTitle;




