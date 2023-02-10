/**
 *
 * AffiliatePage
 *
 */

import React, { memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

import { isMobileOnly } from 'utils/platform';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useAuthentication } from 'utils/hooks';
import {
  getAffiliateToken,
  removeAffiliateToken,
} from 'utils/localStorage/affiliate';

import { path } from 'routers/path';
import Transition from 'components/Transition';

import {
  showDialogAction,
  getAffiliateInfoRequest,
  getAffiliateSettingsRequest,
  cleanDataAction,
} from './actions';
import { CONTEXT } from './constants';
import {
  makeSelectShowDialog,
  makeSelectAffiliateSuccess,
  makeSelectAffiliateInfo,
  makeSelectAffiliateSettings,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Entry, Success } from './views';

const useStyles = makeStyles(theme => ({
  wrapper: {
    borderRadius: isMobileOnly ? theme.spacing(4) : theme.spacing(6),
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: '#fff',
  },
}));

export function AffiliatePage(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const {
    open,
    affiliateSuccess,
    closeDialog,
    affiliateInfo,
    affiliateSettings,
    getAffiliateInfo,
    getAffiliateSettings,
    cleanData,
  } = props;
  const history = useHistory();
  const { showSignInDialog } = useAuthentication();
  const classes = useStyles();
  const affiliateToken = getAffiliateToken();

  useEffect(() => {
    getAffiliateSettings();
  }, []);

  useEffect(() => {
    if (open && affiliateToken) {
      if (affiliateSettings.affiliateEnabled) {
        getAffiliateInfo({ affiliateToken });
      } else {
        removeAffiliateToken();
        history.replace(path.home);
      }
    }
  }, [open]);

  const handleClose = useCallback(() => {
    cleanData();
    removeAffiliateToken();
    history.replace(path.home);
  }, []);

  const handleShowSignIn = () => {
    closeDialog();
    showSignInDialog();
  };

  const handleGotoWallet = () => {
    cleanData();
    history.push(path.wallet);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      PaperProps={{ elevation: 0, className: classes.wrapper }}
      maxWidth={affiliateSuccess ? 'xs' : 'sm'}
    >
      <IconButton
        onClick={handleClose}
        size={isMobileOnly ? 'small' : 'medium'}
        className={classes.closeButton}
      >
        <CancelRoundedIcon />
      </IconButton>
      {affiliateSuccess ? (
        <Success
          onGotoWallet={handleGotoWallet}
          onClose={handleClose}
          affiliateInfo={affiliateInfo}
        />
      ) : (
        <Entry onShowSignIn={handleShowSignIn} affiliateInfo={affiliateInfo} />
      )}
    </Dialog>
  );
}

AffiliatePage.propTypes = {
  open: PropTypes.bool,
  affiliateSuccess: PropTypes.bool,
  affiliateInfo: PropTypes.object,
  affiliateSettings: PropTypes.object,
  closeDialog: PropTypes.func,
  getAffiliateInfo: PropTypes.func,
  getAffiliateSettings: PropTypes.func,
  cleanData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  open: makeSelectShowDialog(),
  affiliateSuccess: makeSelectAffiliateSuccess(),
  affiliateInfo: makeSelectAffiliateInfo(),
  affiliateSettings: makeSelectAffiliateSettings(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    closeDialog: () => dispatch(showDialogAction(false)),
    getAffiliateInfo: payload => dispatch(getAffiliateInfoRequest(payload)),
    getAffiliateSettings: () => dispatch(getAffiliateSettingsRequest()),
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
)(AffiliatePage);
