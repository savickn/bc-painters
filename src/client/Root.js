
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import routes from './routes';


const router = createBrowserRouter(routes);

export default function Root(props) {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

