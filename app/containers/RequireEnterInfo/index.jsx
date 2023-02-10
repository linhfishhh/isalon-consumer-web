/**
 *
 * RequireEnterInfo
 *
 */

import React, { memo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import Transition from 'components/Transition';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import validation from 'utils/validation';
import { getLoggedInUser } from 'utils/auth';

import { CONTEXT, LOADING_ACTIONS } from './constants';
import { updateEmailRequest, cleanDataAction } from './actions';
import { makeSelectUpdateSuccess, makeSelectMessage } from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  wrapper: {},
  closeButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(4),
  },
  content: {
    padding: theme.spacing(0, 4),
  },
  actions: {
    padding: theme.spacing(4),
  },
  error: {
    color: theme.palette.error.main,
  },
}));

export function RequireEnterInfo(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTIONS);

  const {
    acceptLabel,
    open,
    onClose,
    updateEmail,
    onDidUpdateSuccess,
    cleanData,
    message,
    updateSuccess,
  } = props;

  const classes = useStyles();
  const [validate, setValidate] = useState({});
  const [info, setInfo] = useState({});

  const validateField = useCallback(() => {
    const option = [
      {
        type: 'empty',
        model: info,
        keys: ['name', 'email'],
        messages: ['Vui lòng nhập tên của bạn', 'Vui lòng nhập email của bạn'],
      },
      {
        type: 'email',
        model: info,
        keys: ['email'],
        messages: ['Địa chỉ email không đúng định dạng'],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  }, [info]);

  useEffect(() => {
    if (!open) {
      cleanData();
    }
  }, [open]);

  useEffect(() => {
    if (updateSuccess) {
      onDidUpdateSuccess();
    }
  }, [updateSuccess]);

  useEffect(() => {
    const userInfo = getLoggedInUser();
    if (userInfo) {
      setInfo({ name: userInfo.name, email: '' });
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(info)) {
      validateField();
    }
  }, [info]);

  const handleCloseDialog = useCallback(() => {
    onClose();
  }, []);

  const handleUpdateEmail = useCallback(() => {
    const noValidate = validateField();
    if (noValidate) {
      updateEmail(info);
    }
  }, [info]);

  const handleOnChangeTextField = useCallback(event => {
    const { name, value } = event.target;
    setInfo(prev => ({ ...prev, [name]: value }));
    cleanData();
  }, []);

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Transition}
      PaperProps={{ className: classes.wrapper, id: 'paper-content' }}
    >
      <DialogTitle disableTypography className={classes.title}>
        <Typography variant="h5">Vui lòng nhập tên và email</Typography>
        <IconButton className={classes.closeButton} onClick={handleCloseDialog}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Grid container direction="column" spacing={2}>
          <Grid item />
          <Grid item>
            <TextField
              fullWidth
              label="Tên"
              name="name"
              variant="outlined"
              color="secondary"
              size="small"
              value={info.name}
              error={validate.name && validate.name.error}
              helperText={validate.name && validate.name.helperMessageText}
              onChange={handleOnChangeTextField}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              color="secondary"
              size="small"
              value={info.email}
              error={validate.email && validate.email.error}
              helperText={validate.email && validate.email.helperMessageText}
              onChange={handleOnChangeTextField}
            />
          </Grid>
          {!isEmpty(message) && (
            <Grid item>
              <Typography className={classes.error} align="center">
                {message}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button onClick={handleCloseDialog} variant="contained">
          Huỷ
        </Button>
        <Button
          onClick={handleUpdateEmail}
          variant="contained"
          color="primary"
          disabled={!isEmpty(validate) || !isEmpty(message)}
        >
          {acceptLabel || 'Thanh toán'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

RequireEnterInfo.propTypes = {
  acceptLabel: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  updateEmail: PropTypes.func,
  onDidUpdateSuccess: PropTypes.func,
  message: PropTypes.string,
  updateSuccess: PropTypes.bool,
  cleanData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  message: makeSelectMessage(),
  updateSuccess: makeSelectUpdateSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateEmail: payload => dispatch(updateEmailRequest(payload)),
    cleanData: () => dispatch(cleanDataAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RequireEnterInfo);
