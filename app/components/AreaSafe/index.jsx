import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  top: {
    paddingTop: 'env(safe-area-inset-top)',
    width: '100%',
  },
  right: {
    paddingRight: 'env(safe-area-inset-right)',
    height: '100%',
  },
  bottom: {
    paddingBottom: 'env(safe-area-inset-bottom)',
    width: '100%',
  },
  left: {
    paddingLeft: 'env(safe-area-inset-left)',
    height: '100%',
  },
  hide: {
    display: 'none',
  },
}));

function AreaSafe(props) {
  const { className, edge, hide, style } = props;

  const classes = useStyles();

  return (
    <div
      className={`${classes[edge]} ${hide ? classes.hide : ''} ${className}`}
      style={style}
    />
  );
}

AreaSafe.defaultProps = {
  className: '',
  edge: 'top',
  hide: false,
};

AreaSafe.propTypes = {
  className: PropTypes.string,
  edge: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  hide: PropTypes.bool,
  style: PropTypes.object,
};

export default memo(AreaSafe);
