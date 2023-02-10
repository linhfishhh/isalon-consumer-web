import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import viLocale from 'date-fns/locale/vi';
import { parse, format } from 'date-fns';

const useStyles = makeStyles(theme => ({
  detailText: {
    color: theme.palette.textColor[2],
    textAlign: 'left',
  },
  textField: {
    minHeight: 30,
    minWidth: 100,
    color: theme.palette.textColor[1],
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    width: 120,
  },
  input: {
    maxWidth: 400,
  },
  errorText: {
    fontSize: 12,
    color: theme.palette.error.main,
    marginLeft: theme.spacing(3),
  },
}));

function InputDob(props) {
  const classes = useStyles();

  const { dob, onChange, error, errorMessage } = props;
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [inputDate, setInputDate] = useState(null);

  useEffect(() => {
    if (dob) {
      setSelectedStartDate(parse(dob, 'dd/MM/yyyy', new Date()));
    }
  }, [dob]);

  const handleStartDateChange = useCallback(date => {
    setSelectedStartDate(date);
    setInputDate(date);
    if (Date.parse(date)) {
      onChange({
        target: {
          name: 'dob',
          value: format(date, 'dd/MM/yyyy'),
        },
      });
    } else {
      onChange({
        target: {
          name: 'dob',
          value: null,
        },
      });
    }
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
      <Grid
        container
        className={classes.inputRow}
        direction="row"
        wrap="nowrap"
      >
        <Grid item className={classes.label}>
          <Typography className={classes.detailText} display="inline">
            Ngày sinh*
          </Typography>
        </Grid>
        <Grid item xs className={classes.input}>
          <KeyboardDatePicker
            autoOk
            inputVariant="outlined"
            variant="inline"
            disableFuture
            format="dd/MM/yyyy"
            placeholder="__/__/____"
            margin="dense"
            value={selectedStartDate}
            onChange={handleStartDateChange}
            invalidDateMessage="Định dạng ngày tháng không hợp lệ"
            minDateMessage="Ngày sinh lớn hơn 01/01/1900"
            KeyboardButtonProps={{
              edge: 'end',
              size: 'small',
            }}
            fullWidth
          />
          {error && isNull(inputDate) && (
            <Typography className={classes.errorText} display="inline">
              {errorMessage}
            </Typography>
          )}
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

InputDob.defaultProps = {
  dob: null,
  error: false,
};

InputDob.propTypes = {
  dob: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default memo(InputDob);
