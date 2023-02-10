import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  dialogActions: {
    justifyContent: 'center',
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  closeButton: {
    position: 'absolute',
    top: 4,
    right: 0,
  },
}));

function CancelBooking(props) {
  const { order, open, onClose, onConfirmCancel } = props;
  const classes = useStyle();

  const cancelOrder = () => {
    if (onConfirmCancel) {
      onConfirmCancel(order);
    }
  };

  return (
    (order && (
      <Dialog open={open} fullWidth maxWidth="xs">
        <DialogTitle disableTypography>
          <Typography variant="h5" className={classes.title}>
            Huỷ đặt chỗ
          </Typography>
          <IconButton className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider color="#f0f0f0" />
        <DialogContent>
          <div className={classes.content}>
            <Typography>Bạn chắc chắn muốn huỷ đơn đặt chỗ này?</Typography>
            <Typography>
              Lưu ý rằng nếu đơn đặt chỗ đã THANH TOÁN ONLINE rồi bạn sẽ KHÔNG
              ĐƯỢC HOÀN TIỀN!
            </Typography>
          </div>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            onClick={onClose}
          >
            KHÔNG
          </Button>
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={cancelOrder}
          >
            ĐỒNG Ý
          </Button>
        </DialogActions>
      </Dialog>
    )) || <div />
  );
}

CancelBooking.propTypes = {
  order: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirmCancel: PropTypes.func,
};

export default memo(CancelBooking);
