
import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import http from '../../util/httpCaller';

import Modal from '../Modal/modal';

import './PaintComponent.scss';

export default function PaintComponent() {
  
  const lanes = ['available', 'running_low', 'out_of_stock'];

  const [paints, setPaints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPaint, setSelectedPaint] = useState(null);

  const { createAlert, currentUser } = useOutletContext();
  const navigate = useNavigate();

  // on page load
  useEffect(() => {
    // populate paints from server
    http.get(`/api/paints/`)
      .then((res) => {
        setPaints(res.data.paints);
      }).catch(err => {
        createAlert('Unauthorized!', 'danger');
        navigate('/');
      });
  }, []);


  /* DRAG & DROP */

  const handleDragStart = (e) => {
    e.dataTransfer.setData('id', e.target.id);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if(e.target.classList.contains('kanban-lane')) {
      e.target.classList.add('hovered-link');
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if(e.target.classList.contains('kanban-lane')) {
      e.target.classList.remove('hovered-link');
    }
  }

  // 'e.currentTarget' always references 'kanban-lane' element
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // prevent drop outside of kanban-lane
    if(!e.currentTarget.classList.contains('kanban-lane')) {
      return;
    }

    // update paint via API
    let id = e.dataTransfer.getData('id');
    let newStatus = e.currentTarget.getAttribute('data-status');
    let updateObj = paints.filter(paint => id === paint._id)[0];
    updateObj.status = newStatus;

    // prevent drop in other container
    if(newStatus && lanes.includes(newStatus)) {
      updatePaintStatus(updateObj); 
    }
  }

  // used to open Paint status modal
  const openModal = (e, paint) => {
    setSelectedPaint(paint);
    setShowModal(true);
  }

  // used to update Paints status on mobile
  const selectStatus = (e, newStatus) => {
    let updateObj = selectedPaint;
    updateObj.status = newStatus;
    // prevent drop in other container
    if(newStatus && lanes.includes(newStatus)) {
      updatePaintStatus(updateObj); 
      setShowModal(false);
    }
  }


  // update hero attribute after drag&drop
  const updatePaintStatus = (payload) => {
    http.put(`/api/paints/${payload._id}`, payload)
      .then((res) => {
        setPaints([...paints.filter(paint => paint._id !== res.data.paint._id), res.data.paint]);
    }).catch(err => {
        createAlert(`An error occurred! Message: ${err.message}`, 'danger');
    })
  }

  return (
    <div>
      <div className='flex-centered'>
        <div>Paint Board</div>
        <div className='board'>
          { lanes.map((label) => {
            return (
              <div className={`kanban-lane ${label} flex-column`} data-status={label} key={label}
                onDragOver={handleDragOver} 
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>

                <div className={`kanban-header kanban-${label} flex-centered`}>{label.toUpperCase().replaceAll('_', ' ')}</div>
                <div className='paints flex-centered'>
                  { paints.map( paintObj => {
                    if(paintObj.status === label) {
                      return (
                        <div id={paintObj._id} key={paintObj._id}
                          className='kanban-element flex-centered' style={{ backgroundColor: paintObj.color }} 
                          draggable="true" onDragStart={(e) => handleDragStart(e)} onTouchStart={(e) => openModal(e, paintObj)} >
                            {paintObj.color}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal isVisible={showModal}>
        <div className='flex-centered'>
          <div className='flex-centered gap-10'>
            { lanes.map((label) => {
              return <button className='minimal-btn' onTouchStart={(e) => selectStatus(e, label)}>{label.toUpperCase().replaceAll('_', ' ')}</button>
            })}
          </div>
          <hr />
          <button className='btn btn-secondary' onTouchStart={(e) => setShowModal(false)} >Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

