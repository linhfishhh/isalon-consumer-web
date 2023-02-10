import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';

const useStyle = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  dialogActions: {
    justifyContent: 'center',
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    top: 4,
    right: 0,
  },
}));

const cancelReasons = [
  'Thời gian giao hàng quá lâu',
  'Trùng đơn hàng',
  'Thay đổi địa chỉ giao hàng',
  'Thay đổi ý',
];

function CancelOrder(props) {
  const { order, open, onClose, onConfirmCancel } = props;
  const classes = useStyle();

  const [cancelReason, setCancelReason] = useState(cancelReasons[0]);

  const cancelOrder = () => {
    if (onConfirmCancel) {
      onConfirmCancel(order, cancelReason);
    }
  };

  const handleReasonChange = event => {
    setCancelReason(event.target.value);
  };

  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle disableTypography>
        <Typography variant="h5" className={classes.title}>
          Lý do huỷ đơn hàng
        </Typography>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider color="#f0f0f0" />
      <DialogContent>
        <RadioGroup
          name="reason"
          value={cancelReason}
          onChange={handleReasonChange}
        >
          {cancelReasons.map(item => (
            <FormControlLabel
              key={item}
              value={item}
              control={<Radio />}
              label={item}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={cancelOrder}
        >
          HỦY ĐƠN HÀNG
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CancelOrder.propTypes = {
  order: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirmCancel: PropTypes.func,
};

export default memo(CancelOrder);
