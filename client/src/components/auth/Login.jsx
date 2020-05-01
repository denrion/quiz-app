import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { AlertContext } from '../../context/alert/AlertProvider';
import useAuth from '../../hooks/useAuth';

const Login = (props) => {
  const { loginUser, isAuthenticated, error, clearErrors } = useAuth();
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (error) setAlert(error, 'danger');
    clearErrors();
    // eslint-disable-next-line
  }, [error]);

  const { register, handleSubmit, errors } = useForm();

  const onSubmitHandler = (userCredentials) => loginUser(userCredentials);

  if (isAuthenticated) {
    const referer =
      (props.location.state && props.location.state.referer) || '/';
    return <Redirect to={referer} />;
  }

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
        />
      </form>
    </div>
  );
};

export default Login;
