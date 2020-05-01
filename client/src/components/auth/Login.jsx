import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

  const { register, handleSubmit, errors } = useForm();

  const onSubmitHandler = (userCredentials) => loginUser(userCredentials);

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>{' '}
      </h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            className={errors.username && 'has-error'}
            ref={register({
              required: 'This field is required',
              minLength: {
                value: 2,
                message: 'Username must contain at least 2 characters',
              },
              maxLength: {
                value: 30,
                message: 'Usermame must not contain more than 30 characters',
              },
            })}
          />
          {errors.username && (
            <span className='is-error'>{errors.username.message}</span>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            className={errors.password && 'has-error'}
            ref={register({
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password must contain at least 8 characters',
              },
              maxLength: {
                value: 50,
                message: 'Password must not contain more than 50 characters',
              },
            })}
          />
          {errors.password && (
            <span className='is-error'>{errors.password.message}</span>
          )}
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
