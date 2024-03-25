
import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import http from '../../util/httpCaller';

import UserView from './UserRolesForm';

export default function UserManagementView() {

  const [ users, setUsers ] = useState([]);
  const [ roles, setRoles ] = useState([]);

  const { createAlert, currentUser } = useOutletContext();
  const navigate = useNavigate();
  
  // populate users from server
  useEffect(() => {
    http.get(`/api/users/`)
      .then((res) => {
        setUsers(res.data.users);
      }).catch(err => {
        createAlert('Unauthorized!', 'danger');
        navigate('/');
      });

    http.get(`/api/roles/`)
      .then((res) => {
        setRoles(res.data.roles);
      }).catch(err => {
        createAlert('Unauthorized!', 'danger');
        navigate('/');
      });
    
  }, []);

  // save user to database
  const saveUser = (payload) => {
    http.put(`/api/users/${payload._id}`, payload)
      .then((res) => {
        setUsers(users.map(user => {
          return user._id !== res.data.user._id ? user : res.data.user;
        }));
    }).catch(err => {
        createAlert(`An error occurred! Message: ${err.message}`, 'danger');
    })
  }


  return (
    <div>
      <div className='board flex-column'>
        { users.map( userObj => {
          return (
            <UserView key={userObj._id} user={userObj} roles={roles} handleUpdate={saveUser} />
          );
        })}
      </div>
    </div>
  );
}
