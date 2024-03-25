
import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import http from '../../util/httpCaller';

import RoleView from './RolePermissionsForm';

export default function RoleManagementComponent() {

  const [ roles, setRoles ] = useState([]);
  const [ permissions, setPermissions ] = useState([]);

  const { createAlert, currentUser } = useOutletContext();
  const navigate = useNavigate();
  
  // populate roles from server
  useEffect(() => {
    http.get(`/api/roles/`)
      .then((res) => {
        setRoles(res.data.roles);
      }).catch(err => {
        createAlert('Unauthorized!', 'danger');
        navigate('/');
      });

    http.get(`/api/permissions/`)
      .then((res) => {
        setPermissions(res.data.permissions);
      }).catch(err => {
        createAlert('Unauthorized!', 'danger');
        navigate('/');
      });
  }, []);

  // save role to database
  const saveRole = (payload) => {
    http.put(`/api/roles/${payload._id}`, payload)
      .then((res) => {
        setRoles(roles.map(role => {
          return role._id !== res.data.role._id ? role : res.data.role;
        }));
    }).catch(err => {
        console.log(err);
    })
  }

  return (
    <div>
      <div className='board flex-column'>
        { roles.map( roleObj => {
          return (
            <RoleView key={roleObj._id} role={roleObj} permissions={permissions} handleUpdate={saveRole} />
          );
        })}
      </div>
    </div>
  );
}
