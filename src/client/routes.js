
import React from 'react';
import { Route, Switch } from 'react-router-dom';

//import Spinner from 'react-spinkit';

// const options = {
//   fallback: <Spinner name='circle' />,
// };

import App from './components/App/App';
import Home from './components/App/components/Home/HomePage';
import PaintPage from './components/Paint/PaintComponent';
import AdminPage from './components/Admin/AdminComponent';
import UserManagementView from './components/Admin/UserManagementView';
import RoleManagementView from './components/Admin/RoleManagementView';

import LoginPage from './components/Auth/LoginPage';

export default [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/paint",
        element: <PaintPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
        children: [
          {
            path: "/admin/users",
            element: <UserManagementView />,
          },
          {
            path: "/admin/roles",
            element: <RoleManagementView />,
          },
        ]
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]
