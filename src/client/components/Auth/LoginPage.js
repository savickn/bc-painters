
import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useOutletContext, useNavigate } from 'react-router-dom';

import http from '../../util/httpCaller';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { logIn, createAlert } = useOutletContext();


  const handleSubmit = (se) => {
    se.preventDefault();
    
    http.post('auth/local/', {
      email, 
      password, 
    }).then(res => {
      const token = res.data.token;
      const user = res.data.user;
      logIn(user, token);
    }).catch(err => {
      console.log(err);
      let msg = err.response.data.email;
      if(msg) {
        createAlert(msg, 'danger');
      }
    })
  };

  return (
    <div>
      <Helmet title='Login to Your Account.' />
      <form name='loginForm' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email: </label>
          <input type='email' name='userEmail' value={email} onChange={(e) => setEmail(e.target.value)} 
            placeholder='johndoe@example.com' className='form-control' id='email' required></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password: </label>
          <input type='password' name='userPassword' value={password} onChange={(e) => setPassword(e.target.value)} 
            className='form-control' id='password' required></input>
        </div>
        <button type='submit' className='minimal-btn'>Login</button>
      </form>
    </div>
  );
}

