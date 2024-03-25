import React from 'react';
import './Footer.scss';

export default function Footer({ isLoggedIn, currentUser }) {
  return (
    <div className='footer-container'>
      { isLoggedIn &&
        <div className="footer-category flex-centered">
          Logged in as {currentUser.name}
        </div>
      }
      <hr className="my-4 bg-light" />
      <p className="footer-copyright">&copy; Copyright 2024. All rights reserved</p>
    </div>
  );
}
