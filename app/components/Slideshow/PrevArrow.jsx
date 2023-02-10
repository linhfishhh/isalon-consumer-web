/**
 *
 * PrevArrow
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import PrevIcon from '@material-ui/icons/NavigateBefore';

const useStyle = makeStyles(theme => ({
  prev: {
    padding: theme.spacing(1),
    backgroundColor: `rgba(${theme.hexToRgb(
      theme.palette.background.paper,
    )}, 0.7)`,
    border: `solid 1px ${theme.palette.borderColor[1]}`,
    position: 'absolute',
    top: '50%',
    left: -20,
    zIndex: 10,
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

function PrevArrow(props) {
  const { visible, onClick, customClassName } = props;
  const classes = useStyle();
  return (
    <>
      {visible && (
        <button
          className={`${classes.prev} ${customClassName}`}
          onClick={onClick}
          type="button"
        >
          <PrevIcon color="inherit" />
        </button>
      )}
    </>
  );
}

PrevArrow.propTypes = {
  customClassName: PropTypes.string,
  onClick: PropTypes.func,
  visible: PropTypes.bool,
};

export default memo(PrevArrow);
