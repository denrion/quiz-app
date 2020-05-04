import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './NavLinks.scss';

const NavLinks = () => {
  const { isAuthenticated, logoutUser } = useAuth();

  const onLogoutHandler = () => {
    logoutUser();
  };

  const authLinks = (
    <>
      <li>
        <NavLink to='/' exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/questions/new'>Submit Question</NavLink>
      </li>
      <li>
        <a href='#!' onClick={onLogoutHandler}>
          <i className='fas fa-sign-out-alt' /> Logout
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <NavLink to='/register'>Register</NavLink>
      </li>
      <li>
        <NavLink to='/login'>Login</NavLink>
      </li>
    </>
  );

  return (
    <ul className='nav-links'>{isAuthenticated ? authLinks : guestLinks}</ul>
  );
};

export default NavLinks;
