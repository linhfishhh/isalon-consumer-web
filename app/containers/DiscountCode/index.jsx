/**
 *
 * DiscountCode
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import EmptyPage from 'components/EmptyPage';
import InputGiftCode from 'components/InputGiftCode';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectDiscountCodes } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { CONTEXT } from './constants';
import { getDiscountCodesRequest } from './actions';
import Code from './views/Code';

const styles = theme => ({
  root: {
    padding: theme.spacing(4),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h4">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(4, 4, 0, 4),
    backgroundColor: '#F2F2F2',
    borderBottomLeftRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
  },
}))(MuiDialogContent);

const useStyles = makeStyles(theme => ({
  buttonApply: {
    marginTop: theme.spacing(2),
  },
}));

const stateSelector = createStructuredSelector({
  discountCodes: makeSelectDiscountCodes(),
});

function DiscountCode(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const { display, onApply, initialValue } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('TÌM MÃ GIẢM GIÁ');
  const [code, setCode] = useState(initialValue);

  const { discountCodes } = useSelector(stateSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiscountCodesRequest());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const applyGiftCode = useCallback((giftCode, amount) => {
    setTitle(`NHẬP ${giftCode} GIẢM ${amount}`);
    setCode(giftCode);
    setOpen(false);
  }, []);

  return (
    <div>
      {(display === 'button' && (
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={handleClickOpen}
        >
          {title}
        </Button>
      )) || (
        <Grid container>
          <Grid item container direction="row-reverse">
            <InputGiftCode
              onClick={handleClickOpen}
              code={code}
              onChange={applyGiftCode}
            />
          </Grid>
          <Grid item container direction="row-reverse">
            <Button
              className={classes.buttonApply}
              variant="contained"
              color="secondary"
              onClick={() => onApply(code)}
              disableElevation
            >
              ÁP DỤNG
            </Button>
          </Grid>
        </Grid>
      )}

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
        <DialogTitle onClose={handleClose}>Mã giảm giá</DialogTitle>
        <DialogContent dividers>
          {isEmpty(discountCodes) ? (
            <EmptyPage
              title="Không có mã giảm giá"
              subTitle="Bạn chưa có mã giảm giá nào, khi nào có chúng sẽ hiển thị tại đây!"
            />
          ) : (
            discountCodes.map((giftCode, index) => (
              <Code
                data={giftCode}
                key={giftCode.giftCodeId || index}
                onApplyGiftCode={applyGiftCode}
              />
            ))
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

DiscountCode.defaultProps = {
  display: 'button',
  initialValue: '',
};

DiscountCode.propTypes = {
  display: PropTypes.oneOf(['button', 'text-field']),
  onApply: PropTypes.func,
  initialValue: PropTypes.string,
};

export default memo(DiscountCode);
