import React from 'react';
import PropTypes from 'prop-types';

const Typography = ({
  variant,
  weight = 'regular',
  color = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-montserrat';

  const variantStyles = {
    p: 'text-base',
    span: 'text-base',
    h1: 'text-2xl md:text-[40px] font-semibold leading-tight md:leading-snug',
    h2: 'text-xl md:text-[32px] md:leading-[40px] font-medium',
    h3: 'text-lg md:text-2xl font-medium',
    h4: 'text-lg md:text-xl font-medium',
    h5: 'text-base md:text-base font-medium',
    body1: 'text-base',
    body2: 'text-sm',
    body3: 'text-xs',
  };

  const weightStyles = {
    strong: 'font-bold',
    semiBold: 'font-semibold',
    medium: 'font-medium',
    regular: 'font-normal',
  };

  const colorStyles = {
    primary: 'text-black',
    white: 'text-white',
    warning: 'text-warning',
    disabled: 'text-neutral-text',
    error: 'text-error',
    success: 'text-success',
    info: 'text-info',
    primaryHeading: 'text-dark-blue',
  };

  const Tag = (() => {
    switch (variant) {
      case 'body1':
      case 'body2':
      case 'body3':
        return 'p';
      case 'span':
        return 'span';
      case 'h1':
        return 'h1';
      case 'h2':
        return 'h2';
      case 'h3':
        return 'h3';
      case 'h4':
        return 'h4';
      case 'h5':
        return 'h5';
      default:
        return 'p';
    }
  })();

  return (
    <Tag
      className={`${baseStyles} ${variantStyles[variant]} ${weightStyles[weight]} ${colorStyles[color]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

Typography.propTypes = {
  variant: PropTypes.oneOf([
    'p',
    'span',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'body1',
    'body2',
    'body3',
  ]).isRequired,
  weight: PropTypes.oneOf(['strong', 'semiBold', 'medium', 'regular']),
  color: PropTypes.oneOf([
    'primary',
    'success',
    'warning',
    'error',
    'disabled',
    'info',
    'primaryHeading',
    'white',
  ]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Typography;