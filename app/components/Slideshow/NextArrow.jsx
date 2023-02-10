/**
 *
 * NextArrow
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import NextIcon from '@material-ui/icons/NavigateNext';

const useStyle = makeStyles(theme => ({
  next: {
    padding: theme.spacing(1),
    backgroundColor: `rgba(${theme.hexToRgb(
      theme.palette.background.paper,
    )}, 0.7)`,
    border: `solid 1px ${theme.palette.borderColor[1]}`,
    position: 'absolute',
    top: '50%',
    right: -20,
    transform: 'translateY(-50%)',
    borderRadius: '50%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: `rgba(${theme.hexToRgb(
        theme.palette.background.paper,
      )}, 0.2)`,
    },
  },
}));

function NextArrow(props) {
  const { visible, onClick, customClassName } = props;
  const classes = useStyle();
  return (
    <>
      {visible && (
        <button
          className={`${classes.next} ${customClassName}`}
          onClick={onClick}
          type="button"
        >
          <NextIcon color="inherit" />
        </button>
      )}
    </>
  );
}

NextArrow.propTypes = {
  customClassName: PropTypes.string,
  onClick: PropTypes.func,
  visible: PropTypes.bool,
};

export default memo(NextArrow);
