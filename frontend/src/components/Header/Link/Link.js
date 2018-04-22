import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

const Link = ({active, className, label, ...others}) => {
  return (
    <a className={style.link} {...others}>
      {label}
    </a>
  );
};

Link.props = {
  label: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
}

Link.defaultProps = {
  active: false,
  className: ''
}

export default Link;