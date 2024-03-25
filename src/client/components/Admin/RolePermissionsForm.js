
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function RolePermissionsForm({ role, permissions, handleUpdate }) {

  const [ showForm, setShowForm ] = useState(false);

  // update role object
  const handleCheckboxChange = (e) => {
    const { name, id, checked } = e.target;
    let rolePayload = role;
    // add permission to role
    if (checked) {
      rolePayload.permissions.push(id);

    // remove permission from role
    } else {
      rolePayload.permissions = rolePayload.permissions.filter(perm => perm._id !== id);
    }
    handleUpdate(rolePayload);
  }

  const hasPermission = (permission) => {
    return role.permissions.filter(perm => perm._id === permission._id).length > 0;
  }

  // propagate changes

  return (
    <div className='flex-column'>
      <div className='padding-10'>
        <div style={{ cursor: 'pointer' }} onClick={() => setShowForm(!showForm)}><span>{role.name}</span> <FontAwesomeIcon icon={faChevronDown} size={'xs'} /></div>
        { showForm && 
          <div>
            { permissions.map(perm => {
              return (
                <div key={perm.name} className='form-check'>
                  <input
                    type='checkbox'
                    id={perm._id}
                    name={perm.name}
                    className='form-check-input'
                    checked={hasPermission(perm) || false}
                    onChange={(e) => handleCheckboxChange(e)}
                  />
                  <label htmlFor={perm.name}>{perm.name}</label>
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
