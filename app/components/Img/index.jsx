/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from 'assets/images/ic_logo.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    objectFit: props => props.resizeMode,
  },
}));

function Img(props) {
  const { className, src, alt, ...rest } = props;
  const imageSource = src || defaultImage;
  const classes = useStyles(rest);
  return (
    <img
      className={`${className} ${classes.root}`}
      src={imageSource}
      alt={alt}
    />
  );
}

Img.defaultProps = {
  alt: 'photo',
  resizeMode: 'cover',
  src: defaultImage,
};

// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]),
  alt: PropTypes.string,
  className: PropTypes.string,
  resizeMode: PropTypes.oneOf(['fill', 'contain', 'cover', 'scale-down']),
};

export default Img;
