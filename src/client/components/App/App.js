import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import Helmet from 'react-helmet';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Alert from '../Alert/Alert';

import * as auth from '../../util/AuthService';


const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);


export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const [message, setMessage] = useState('');
  const [alertState, setAlertState] = useState(null);
  const [alertTimeout, setAlertTimeout] = useState(null);
  const alertRef = useRef(null);

  const navigate = useNavigate();

  // on page load
  useEffect(() => {
    // populate currentUser from localStorage on page load
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
     setCurrentUser(currentUser);
    }
  }, []);


  // create new Alert
  const createAlert = (msg, state) => {
    // if new alert, clear old alerts
    if(alertTimeout) {
      clearTimeout(alertTimeout);
      setAlertTimeout(null);
    }
    setMessage(msg);
    setAlertState(state);
    //alertRef.current.scrollIntoView({ behavior: "smooth" })
    let timeout = setTimeout(() => {
      setMessage('');
      setAlertState(null);
      setAlertTimeout(null);
    }, 1500);
    setAlertTimeout(timeout);
  }

  // log out
  const logOut = () => {
    auth.removeAuthToken();
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    createAlert('Logout Successful!', 'success');
    navigate('/login', { replace: true });
  }

  // log in
  const logIn = (user, token) => {
    auth.setAuthToken(token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    navigate('/', { replace: true }); 
    createAlert('Login Successful!', 'success');
  }

  return (
    <React.Fragment>
      <Helmet
        title="MyReactApp"
        titleTemplate="%s - Social App"
        base={{
          href: '/',
        }}
        meta={[
          { charset: 'utf-8' },
          {
            'http-equiv': 'X-UA-Compatible',
            content: 'IE=edge',
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          },
        ]}
        link={[
          {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
          },
        ]}
      />
      <div>
        <Header isLoggedIn={currentUser !== null} currentUser={currentUser} logOut={logOut}  />
        <Alert ref={alertRef} message={message} alertState={alertState} />
      </div>
      
      <div className="container">
        <Outlet context={{ logIn, createAlert, currentUser }} />
      </div>
      <Footer isLoggedIn={currentUser !== null} currentUser={currentUser} />
    </React.Fragment>
  );
}
