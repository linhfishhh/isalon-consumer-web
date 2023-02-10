/**
 *
 * AlertDialog
 *
 */

import React from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Button from 'components/Button';

const useStyle = makeStyles(theme => ({
  paper: {
    borderRadius: isMobileOnly ? theme.spacing(4) : theme.spacing(2),
    position: 'relative',
  },
  title: {
    textAlign: isMobileOnly ? 'center' : 'left',
  },
  button: {
    borderRadius: 20,
  },
  actions: {
    justifyContent: isMobileOnly ? 'space-around' : 'flex-end',
    padding: theme.spacing(4),
  },
  shadowView: {
    height: theme.spacing(3),
    borderTopLeftRadius: theme.spacing(4),
    borderTopRightRadius: theme.spacing(4),
    position: 'absolute',
  },
  shadow1: {
    backgroundColor: '#f0f1f1',
    top: theme.spacing(-2),
    left: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: -1,
  },
  shadow2: {
    backgroundColor: '#e5e6e7',
    top: theme.spacing(-4),
    left: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: -1,
  },
}));

function AlertDialog(props) {
  const {
    open,
    title,
    description,
    onCancel,
    onConfirm,
    buttonCancelLabel,
    buttonConfirmLabel,
  } = props;
  const classes = useStyle();

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
      PaperProps={{ className: classes.paper }}
    >
      {isMobileOnly && (
        <>
          <div className={`${classes.shadowView} ${classes.shadow2}`} />
          <div className={`${classes.shadowView} ${classes.shadow1}`} />
        </>
      )}
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.actions}>
        {onCancel && (
          <Button
            name={buttonCancelLabel}
            options={{ showIcon: false }}
            onClick={onCancel}
            color="default"
            className={classes.button}
          />
        )}

        {onConfirm && (
          <Button
            name={buttonConfirmLabel}
            options={{ showIcon: false }}
            onClick={onConfirm}
            className={classes.button}
          />
        )}
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.defaultProps = {
  open: false,
  title: 'iSalon',
  buttonCancelLabel: 'Huỷ',
  buttonConfirmLabel: 'Đồng ý',
};

AlertDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonCancelLabel: PropTypes.string,
  buttonConfirmLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default AlertDialog;
