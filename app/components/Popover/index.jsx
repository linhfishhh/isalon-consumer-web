import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Popover as MuiPopover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  popover: {
    marginTop: 1,
  },
}));

const Popover = props => {
  const { open, onClose, children, align, position, anchorEl } = props;

  const classes = useStyle();

  const anchorOrigin = {
    vertical: 'bottom',
    horizontal: align,
  };
  const transformOrigin = {
    vertical: 'top',
    horizontal: align,
  };

  return (
    <MuiPopover
      className={classes.popover}
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      anchorReference={position ? 'anchorPosition' : undefined}
      anchorPosition={position}
    >
      {children}
    </MuiPopover>
  );
};

Popover.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  align: PropTypes.oneOf(['left', 'right']),
  anchorEl: PropTypes.any,
  position: PropTypes.object,
};

export default memo(Popover);
