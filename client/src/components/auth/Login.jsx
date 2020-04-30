import React, { useState } from 'react';

const Login = () => {
  const initialState = {
    username: '',
    password: '',
  };

  const [user, setUser] = useState(initialState);

  const { username, password } = user;

  const onChangeHandler = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('Login submitted');
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>{' '}
      </h1>
      <form>
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
