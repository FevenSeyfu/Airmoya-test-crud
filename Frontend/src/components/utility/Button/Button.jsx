import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  type = "button",
  disabled = false,
  onClick,
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center font-montserrat text-base  text-center rounded-lg py-2 px-8 transition-colors duration-300 border
        ${disabled ? 'bg-neutral-bg text-neutral-text cursor-not-allowed' : 'bg-dark-blue text-white'}
        ${!disabled && 'hover:border hover:bg-white hover:text-dark-blue hover:border-dark-blue focus:bg-light-dark-blue focus:text-white active:bg-light-dark-blue active:text-white'}
        ${className}`}
      onClick={disabled ? null : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;