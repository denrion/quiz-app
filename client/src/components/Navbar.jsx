import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>

      <ul>
        <li>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
        </li>
      </ul>
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
