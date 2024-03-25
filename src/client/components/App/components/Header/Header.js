
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import './header.scss';

export default function Header({ isLoggedIn, currentUser, logOut }) {  
  
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="header-container flex-wrap">
          <Link className="navbar-brand" to="/">
            <FontAwesomeIcon icon={faHouse} />  BCPainters
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              { isLoggedIn &&
                <li className="nav-item">
                  <Link className="nav-link" to="/paint">Paint Management</Link>
                </li>
              }
              { isLoggedIn &&
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/users">Admin</Link>
                </li>
              }
              { isLoggedIn ? 
                  <li className="nav-item">
                    <Link className="nav-link" onClick={() => logOut()}>Log Out</Link>
                  </li>
                :
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Sign In</Link>
                  </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}