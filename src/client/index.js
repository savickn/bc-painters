
import React from 'react';
import * as ReactDOM from "react-dom/client";

/* alternative to <link> to CDN */
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import './libs.scss'; // used to import bootstrap from node_modules
import './styles.scss';

import Root from './Root'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Root />
)

if(module.hot) {
  console.log('Using Hot Module Replacement...');
  module.hot.accept('./Root', () => {
    console.log('HMR Component');
    root.render(
      <Root />
    )
  })
}
