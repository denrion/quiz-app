import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = ({ title, icon }) => {
  const { isAuthenticated, user, logoutUser, loading } = useAuth();

  const onLogoutHandler = () => {
    logoutUser();
  };

  const authLinks = (
    <>
      <li>Hello {user && user.displayName}</li>
      <li>
        <a href='#!' onClick={onLogoutHandler}>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </>
  );

  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>

      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'QuizzApp',
  icon: 'fas fa-question-circle',
};

export default Navbar;
