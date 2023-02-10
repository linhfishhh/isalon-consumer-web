/**
 *
 * Popup
 *
 */

import React, { memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

import Transition from 'components/Transition';
import Img from 'components/Img';

import { useInjectReducer } from 'utils/injectReducer';
import { isMobileOnly } from 'utils/platform';
import { useGlobalConfig } from 'utils/hooks';
import { popupDisplay, canShowPopup } from 'utils/popup';
import universalLinks from 'utils/universalLinks';

import { showPopupAction } from './actions';
import { CONTEXT } from './constants';
import { makeSelectOpenPopup } from './selectors';
import reducer from './reducer';

const useStyles = makeStyles(theme => ({
  wrapper: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 800,
    },
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: '#fff',
  },
}));

export function Popup(props) {
  useInjectReducer({ key: CONTEXT, reducer });

  const { open, onClose } = props;
  const classes = useStyles();
  const { globalConfig } = useGlobalConfig();
  const canShow = canShowPopup();
  const enabled = get(globalConfig, 'theme_home_popup_enabled', '0') === '1';
  const openPopup = open && enabled && canShow;

  useEffect(() => {
    if (open && enabled && canShow) {
      popupDisplay();
    }
  }, [open, globalConfig]);

  const handleClick = useCallback(() => {
    onClose();
    universalLinks.redirectLink(globalConfig.theme_home_popup_url);
  }, [globalConfig]);

  return (
    <Dialog
      open={openPopup}
      TransitionComponent={Transition}
      PaperProps={{ elevation: 0, className: classes.wrapper }}
      fullWidth
    >
      <IconButton
        onClick={onClose}
        size={isMobileOnly ? 'small' : 'medium'}
        className={classes.closeButton}
      >
        <CancelRoundedIcon />
      </IconButton>
      <Typography component="div" onClick={handleClick}>
        <Img src={globalConfig.theme_home_popup_image} />
      </Typography>
    </Dialog>
  );
}

Popup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  open: makeSelectOpenPopup(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onClose: () => dispatch(showPopupAction(false)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Popup);
