import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

const Button = (props) => {
  const btnClasses = `button button--${props.size} button--${props.shape} button--${props.effect}
  button--${props.display} button--${props.color} ${props.className}`;

  if (props.href) {
    return (
      <a className={btnClasses} href={props.href} style={props.style}>
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={btnClasses}
        style={props.style}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={btnClasses}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  to: PropTypes.string,
  exact: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  size: PropTypes.oneOf(['normal', 'small', 'big']),
  shape: PropTypes.oneOf(['square', 'rounded', 'round']),
  effect: PropTypes.oneOf(['no-effect', 'inverse', 'cta']),
  display: PropTypes.oneOf(['inline', 'block']),
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'danger',
    'success',
    'warning',
    'dark',
    'light',
  ]),
};

Button.defaultProps = {
  type: 'button',
  size: 'normal',
  shape: 'square',
  effect: 'no-effect',
  display: 'inline',
  color: 'default',
};

export default Button;
