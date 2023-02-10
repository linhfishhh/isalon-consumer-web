/**
 *
 * InputGiftCode
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Input, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 280,
  },
  grid1: {
    background: theme.palette.primary.main,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minWidth: 60,
    height: '100%',
  },
  text1: {
    color: 'white',
    width: '100%',
    height: '100%',
  },
  grid2: {
    background: '#E6E6E6',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  text2: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

function InputGiftCode(props) {
  const { onClick, code, onChange } = props;
  const classes = useStyles();
  return (
    <Grid container className={classes.root} alignItems="center" wrap="nowrap">
      <Grid item className={classes.grid1}>
        <ButtonBase className={classes.text1} onClick={onClick}>
          TÌM
        </ButtonBase>
      </Grid>
      <Grid item xs className={classes.grid2}>
        <Input
          disableUnderline
          className={classes.text2}
          value={code}
          onChange={event => onChange(event.target.value)}
        />
      </Grid>
    </Grid>
  );
}

InputGiftCode.propTypes = {
  onClick: PropTypes.func,
  code: PropTypes.string,
  onChange: PropTypes.func,
};

export default memo(InputGiftCode);
