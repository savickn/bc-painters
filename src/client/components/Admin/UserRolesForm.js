
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import http from '../../util/httpCaller';

export default function UserRolesForm({ user, roles, handleUpdate }) {

  const [ showForm, setShowForm ] = useState(false);

  // update role object
  const handleCheckboxChange = (e) => {
    const { name, id, checked } = e.target;
    let userPayload = user;
    // add role to user
    if (checked) {
      userPayload.roles.push(id);

    // remove permission from role
    } else {
      userPayload.roles = userPayload.roles.filter(role => role._id !== id);
    }
    handleUpdate(userPayload);
  }

  const hasRole = (role) => {
    return user.roles.filter(r => r._id === role._id).length > 0;
  }

  return (
    <div className='flex-column'>
      <div className='padding-10'>
      <div style={{ cursor: 'pointer' }} onClick={() => setShowForm(!showForm)}><span>{user.name}</span> <FontAwesomeIcon icon={faChevronDown} size={'xs'} /></div>
        { showForm && 
          <div>
            { roles.map(role => {
              return (
                <div key={role.name} className='form-check'>
                  <input
                    type="checkbox"
                    id={role._id}
                    name={role.name}
                    className='form-check-input'
                    checked={hasRole(role) || false}
                    onChange={(e) => handleCheckboxChange(e)}
                  />
                  <label htmlFor={role.name}>{role.name}</label>
                </div>
              );
            })}
          </div>
        }
        <hr/>
      </div>
    </div>
  );
}
