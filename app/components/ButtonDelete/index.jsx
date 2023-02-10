/**
 *
 * ButtonDelete
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  buttonDelete: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  iconDelete: {
    color: 'white',
  },
}));

function ButtonDelete(props) {
  const { className, onClick } = props;
  const classes = useStyles();
  return (
    <ButtonBase
      className={`${classes.buttonDelete} ${className}`}
      onClick={onClick}
    >
      <DeleteIcon className={classes.iconDelete} />
    </ButtonBase>
  );
}

ButtonDelete.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default memo(ButtonDelete);
