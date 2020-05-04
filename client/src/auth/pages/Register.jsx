import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

  const { register, handleSubmit, errors, getValues } = useForm();

  const onSubmitHandler = (formData) => {
    registerUser(formData);
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>{' '}
      </h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className='form-group'>
          <label htmlFor='displayName'>Display Name</label>
          <input
            type='text'
            name='displayName'
            id='displayName'
            className={errors.displayName && 'has-error'}
            ref={register({
              required: 'This field is required',
              minLength: {
                value: 2,
                message: 'Display name must contain at least 2 characters',
              },
              maxLength: {
                value: 30,
                message:
                  'Display name must not contain more than 30 characters',
              },
            })}
          />
          {errors.displayName && (
            <span className='is-error'>{errors.displayName.message}</span>
          )}
        </div>
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
                message: 'Username must not contain more than 30 characters',
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
        <div className='form-group'>
          <label htmlFor='passwordConfirm'>Confirm Password</label>
          <input
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            className={errors.passwordConfirm && 'has-error'}
            ref={register({
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Passoword must contain at least 8 characters',
              },
              maxLength: {
                value: 50,
                message: 'Passoword must not contain more than 50 characters',
              },
              validate: (value) =>
                value === getValues().password || 'Passwords do not match',
            })}
          />
          {errors.passwordConfirm && (
            <span className='is-error'>{errors.passwordConfirm.message}</span>
          )}
        </div>
        <button type='submit' className='btn btn--primary btn--block my-3'>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
