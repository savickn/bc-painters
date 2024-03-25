
import React, { useRef } from 'react';

import './modal.scss';

export default function Modal({ isVisible, close, children }) {
  
  const modalRef = useRef(null);

  const hideModal = (e) => {
    if(e.target === modalRef.current) {
      close();
    }
  }


  return (
    <div>
      { isVisible && 
        <div className='ns-modal' ref={modalRef}>
          <div className='ns-modal-content'>
            {children}
          </div>
        </div>
      }
    </div>
  );
}

