import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  root: {
    width: '100%',
    height: 'calc(200px + env(safe-area-inset-top))',
    clipPath: 'ellipse(70% 49% at 50% 30%)',
    WebkitClipPath: 'ellipse(70% 49% at 50% 30%)',
    background: props =>
      props.isBooking
        ? 'linear-gradient(90deg, #ff5c39 0%, #D91C5C 100%)'
        : 'linear-gradient(90deg, #9E1F63 0%, #D91C5C 100%)',
    zIndex: -2,
    position: 'fixed',
    top: 0,
    left: 0,
  },
  rootNotMobile: {
    width: '100%',
    background: 'linear-gradient(90deg, #9E1F63 0%, #D91C5C 100%)',
    height: 220,
    position: 'absolute',
  },
}));

function BgGradientMobile(props) {
  const { children, isMobile = false, isBooking } = props;
  const classes = useStyle({ isBooking });
  return (
    <div className={isMobile ? classes.root : classes.rootNotMobile}>
      {children}
    </div>
  );
}

BgGradientMobile.defaultProps = {
  isBooking: true,
};

BgGradientMobile.propTypes = {
  children: PropTypes.any,
  isMobile: PropTypes.bool,
  isBooking: PropTypes.bool,
};

export default BgGradientMobile;
