import React, { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../context/alert/AlertProvider';
import { AuthContext } from '../../context/auth/AuthProvider';

const Register = ({ history }) => {
  const { registerUser, error, clearErrors, isAuthenticated } = useContext(
    AuthContext
  );
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (isAuthenticated) history.push('/');

    if (error) setAlert(error, 'danger');
    clearErrors();

    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const initialState = {
    displayName: '',
    username: '',
    password: '',
    passwordConfirm: '',
  };

  const [user, setUser] = useState(initialState);

  const { displayName, username, password, passwordConfirm } = user;

  const onChangeHandler = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    registerUser({
      displayName,
      username,
      password,
      passwordConfirm,
    });
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>{' '}
      </h1>
      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='displayName'>Display Name</label>
          <input
            type='text'
            name='displayName'
            id='displayName'
            value={displayName}
            onChange={onChangeHandler}
            required
            minLength='2'
            maxLength='30'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={onChangeHandler}
            required
            minLength='2'
            maxLength='30'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={onChangeHandler}
            required
            minLength='8'
            maxLength='50'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='passwordConfirm'>Confirm Password</label>
          <input
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            value={passwordConfirm}
            onChange={onChangeHandler}
            required
            minLength='8'
            maxLength='50'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
