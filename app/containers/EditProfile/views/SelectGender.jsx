/**
 *
 * EditProfile
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  detailText: {
    color: theme.palette.textColor[2],
    textAlign: 'left',
  },
  button: {
    height: 30,
    minWidth: 60,
    borderRadius: 15,
    fontWeight: 'normal',
    padding: 0,
    margin: theme.spacing(1),
    boxShadow: 'none',
  },
  buttonSelected: {
    color: '#fff',
  },
  buttonNormal: {
    color: theme.palette.grey[800],
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(3),
  },
  label: {
    width: 120,
  },
}));

const MALE = 'Nam'; // 1
const FEMALE = 'Nữ'; // 0

function SelectGender(props) {
  const classes = useStyles();

  const { defaultValue = MALE, onChange } = props;
  const [gender, setGender] = useState(defaultValue);

  useEffect(() => {
    setGender(defaultValue);
  }, [defaultValue]);

  const setMale = useCallback(() => {
    setGender(MALE);
    onChange({
      target: {
        name: 'gender',
        value: 1,
      },
    });
  }, []);

  const setFemale = useCallback(() => {
    setGender(FEMALE);
    onChange({
      target: {
        name: 'gender',
        value: 0,
      },
    });
  }, []);

  return (
    <Grid container className={classes.inputRow} direction="row" wrap="nowrap">
      <Grid item className={classes.label}>
        <Typography className={classes.detailText} display="inline">
          Giới tính*
        </Typography>
      </Grid>
      <Grid item>
        <Grid container justify="flex-start" alignItems="center" wrap="nowrap">
          <Grid item>
            <Button
              className={`${classes.button} ${
                gender === MALE ? classes.buttonSelected : classes.buttonNormal
              }`}
              variant="contained"
              color={gender === MALE ? 'primary' : 'default'}
              onClick={setMale}
            >
              Nam
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={`${classes.button} ${
                gender === FEMALE
                  ? classes.buttonSelected
                  : classes.buttonNormal
              }`}
              variant="contained"
              color={gender === FEMALE ? 'primary' : 'default'}
              onClick={setFemale}
            >
              Nữ
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

SelectGender.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default memo(SelectGender);
