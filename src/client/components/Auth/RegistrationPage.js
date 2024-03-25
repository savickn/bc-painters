
import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useOutletContext, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import axios from '../../util/httpCaller';


export default function RegistrationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState(null);

  const { logIn, createAlert } = useOutletContext();

  const navigate = useNavigate();

//   useEffect(() => {
//     client.get('?_limit=10').then((response) => {
//        setPosts(response.data);
//     });
//  }, []);

  const passwordLongEnough = () => {
    return password.length >= 6;
  }

  const passwordHasNumber = () => {
    const regex = /[0-9]/;
    return regex.test(password);
  }

  const passwordHasSpecialCharacter = () => {
    const regex = /(\$|\&|\*|\+|\^|@)/;
    return regex.test(password);
  }

  const handleSubmit = (se) => {
    se.preventDefault();

    // send request
    axios.post('api/users/', {
      name, 
      email,
      password,
    }).then(res => {
      console.log(res);
      const token = res.data.token;
      const user = res.data.user;
      logIn(user, token);
      navigate('/', { replace: true });
    }).catch(err => {
      console.log('error', err.response);
      let msg = err.response.data.errors.email.message;
      if(msg) {
        createAlert(msg, 'danger');
      }
    })
  };

  return (
    <div>
      <Helmet title='Create a new account.' />
      <form name='userForm' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name: </label>
          <input type='text' name='userName' value={name} onChange={(e) => setName(e.target.value)} 
            placeholder='John Doe' className='form-control' id='name' required></input>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email: </label>
          <input type='email' name='userEmail' value={email} onChange={(e) => setEmail(e.target.value)} 
            placeholder='johndoe@example.com' className='form-control' id='email' required></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password: </label>
          <input type='password' name='userPassword' value={password} onChange={(e) => setPassword(e.target.value)} 
            className='form-control' id='password' required></input>
          <div id='passwordInfo'>
            <p>{ passwordLongEnough() ? 
              <FontAwesomeIcon icon={faCheck} className='greenText' /> : 
              <FontAwesomeIcon icon={faXmark} className='redText' />}
                <span>  Must be at least 6 characters long.</span>
            </p>
            <p>{ passwordHasSpecialCharacter() ? 
              <FontAwesomeIcon icon={faCheck} className='greenText' /> : 
              <FontAwesomeIcon icon={faXmark} className='redText' />}
                <span>  Must contain a special character.</span>
            </p>
            <p>{ passwordHasNumber() ?
              <FontAwesomeIcon icon={faCheck} className='greenText' /> : 
              <FontAwesomeIcon icon={faXmark} className='redText' />}
                <span>  Must contain at least one number.</span>
            </p>
          </div>
        </div>
        <button type="submit" className='minimal-btn'>Submit</button>
      </form>
    </div>
  );
}

