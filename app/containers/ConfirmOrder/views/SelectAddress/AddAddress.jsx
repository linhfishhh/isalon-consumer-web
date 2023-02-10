import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { isMobileOnly } from 'utils/platform';

import Transition from 'components/Transition';
import UpsertAddress from 'containers/UpsertAddress';

const useStyles = makeStyles(theme => ({
  wrapper: {
    overflow: 'auto',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function AddAddress(props) {
  const { open, onClose } = props;
  const classes = useStyles();

  const handleCloseDialog = useCallback(() => {
    onClose();
  }, []);

  return (
    <Dialog
      fullScreen={isMobileOnly}
      open={open}
      TransitionComponent={Transition}
      PaperProps={{ className: classes.wrapper, id: 'paper-content' }}
    >
      {!isMobileOnly && (
        <IconButton className={classes.closeButton} onClick={handleCloseDialog}>
          <CloseIcon />
        </IconButton>
      )}
      <UpsertAddress onClose={onClose} isDialog />
    </Dialog>
  );
}

AddAddress.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default memo(AddAddress);
