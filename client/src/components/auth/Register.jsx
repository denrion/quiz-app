import React, { useState } from 'react';

const Register = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    displayName: '',
    username: '',
    password: '',
    passwordConfirm: '',
  };

  const [user, setUser] = useState(initialState);

  const {
    firstName,
    lastName,
    displayName,
    username,
    password,
    passwordConfirm,
  } = user;

  const onChangeHandler = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('Register submitted');
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>{' '}
      </h1>
      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            name='firstName'
            id='firstName'
            value={firstName}
            onChange={onChangeHandler}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            name='lastName'
            id='lastName'
            value={lastName}
            onChange={onChangeHandler}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='displayName'>Display Name</label>
          <input
            type='text'
            name='displayName'
            id='displayName'
            value={displayName}
            onChange={onChangeHandler}
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
