import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';
import './MainNavigation.scss';
import NavLinks from './NavLinks';

const MainNavigation = ({ title, icon }) => {
  return (
    <MainHeader>
      <button className='main-navigation__menu-btn'>
        <span />
        <span />
        <span />
      </button>
      <h1 className='main-navigation__title'>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <nav>
        <NavLinks />
      </nav>
    </MainHeader>
  );
};

MainNavigation.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

MainNavigation.defaultProps = {
  title: 'Les Quizerables',
  icon: 'fas fa-question-circle',
};

export default MainNavigation;
