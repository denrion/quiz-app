import React, { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../context/alert/AlertProvider';
import { AuthContext } from '../../context/auth/AuthProvider';

const Login = ({ history }) => {
  const {
    loginUser,
    isAuthenticated,
    error,
    clearErrors,
    loading,
  } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (isAuthenticated) history.push('/');

    if (error) setAlert(error, 'danger');

    clearErrors();

    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const initialState = {
    username: '',
    password: '',
  };

  const [credentials, setCredentials] = useState(initialState);

  const { username, password } = credentials;

  const onChangeHandler = (event) =>
    setCredentials({ ...credentials, [event.target.name]: event.target.value });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    loginUser(credentials);
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>{' '}
      </h1>
      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={onChangeHandler}
            required
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
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
          disabled={!loading}
        />
      </form>
    </div>
  );
};

export default Login;
