
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

import http from '../../util/httpCaller';

import './AdminComponent.scss';

export default function AdminComponent() {

  const panels = ['Users', 'Roles'];

  const { createAlert, currentUser } = useOutletContext();

  return (
    <div>
      <div className='flex-centered'>Admin Panel</div>
      <div className='board flex-row'>
        <Link className='toggleBtn' to="/admin/users">Users</Link>
        <Link className='toggleBtn' to="/admin/roles">Roles</Link>
      </div>
      <Outlet context={{ createAlert, currentUser }} />
    </div>
  );
}


