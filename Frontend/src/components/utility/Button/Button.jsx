import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  type = "button",
  disabled = false,
  onClick,
  children,
  className = "",
  elType = "primary",
}) => {
  const primaryStyles = `bg-dark-blue text-white`;
  const secondaryStyles = `bg-white text-dark-blue border-dark-blue`;
  const hoverFocusActiveStyles = `hover:border-dark-blue hover:bg-light-purple hover:text-dark-blue focus:border-dark-blue focus:bg-light-purple focus:text-dark-blue active:border-dark-blue active:bg-light-purple active:text-dark-blue`;

  return (
    <button
      type={type}
      className={`flex box-border items-center justify-center font-montserrat text-base text-center rounded-lg py-2 px-8 transition-colors duration-300 border ${elType === 'primary' ? primaryStyles : secondaryStyles}
        ${disabled && 'bg-opacity-85 cursor-not-allowed'}
        ${!disabled && hoverFocusActiveStyles}
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
  elType: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;