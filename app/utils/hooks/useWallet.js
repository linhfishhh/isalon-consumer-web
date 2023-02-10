import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useAuthentication } from 'utils/hooks/useAuthentication';
import { useAffiliate } from 'utils/hooks/useAffiliate';
import {
  getAffiliateToken,
  removeAffiliateToken,
} from 'utils/localStorage/affiliate';

import {
  getWalletRequest,
  needUpdateWalletAction,
  cleanDataAction,
  walletInvitedAction,
} from 'containers/WalletPage/actions';
import { CONTEXT } from 'containers/WalletPage/constants';
import reducer from 'containers/WalletPage/reducer';
import saga from 'containers/WalletPage/saga';
import {
  makeSelectWallet,
  makeSelectNeedUpdate,
} from 'containers/WalletPage/selectors';

const stateSelector = createStructuredSelector({
  wallet: makeSelectWallet(),
  needUpdate: makeSelectNeedUpdate(),
});

export const useWallet = () => {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const dispatch = useDispatch();
  const { wallet, needUpdate } = useSelector(stateSelector);
  const { affiliateSuccess, affiliateSettings } = useAffiliate();
  const { authenticated, loginCompleted } = useAuthentication();

  const getWallet = useCallback(() => {
    dispatch(getWalletRequest());
  }, []);

  const getWalletWithAT = useCallback(at => {
    dispatch(getWalletRequest({ at }));
  }, []);

  const needUpdateWallet = useCallback(() => {
    dispatch(needUpdateWalletAction());
  }, []);

  useEffect(() => {
    if (loginCompleted && authenticated) {
      const affiliateToken = getAffiliateToken();
      if (affiliateToken && affiliateSettings.affiliateEnabled) {
        getWalletWithAT(affiliateToken);
      }
    }
  }, [loginCompleted]);

  useEffect(() => {
    if (authenticated) {
      const affiliateToken = getAffiliateToken();
      if (isEmpty(affiliateToken)) {
        getWallet();
      }
    } else {
      dispatch(cleanDataAction());
    }
  }, [authenticated, needUpdate]);

  useEffect(() => {
    if (!isEmpty(wallet)) {
      if (wallet.isInvited) {
        removeAffiliateToken();
        affiliateSuccess();
        dispatch(walletInvitedAction());
      }
    }
  }, [wallet]);

  return {
    wallet,
    affiliateSettings,
    getWallet,
    getWalletWithAT,
    needUpdateWallet,
  };
};
