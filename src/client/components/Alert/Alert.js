
import React from 'react';
import { Alert } from 'react-bootstrap';

// success, warning, info, danger
export default function AlertComp({ message, alertState }) {  
  
  return alertState ? (
    <div className='full-width'>
      <Alert variant={alertState} className='flex-column-align-center'>
        {message}
      </Alert>
    </div>
  ) : (<div></div>)

}