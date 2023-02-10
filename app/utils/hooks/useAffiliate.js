import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';

import {
  showDialogAction,
  affiliateSuccessAction,
} from 'containers/AffiliatePage/actions';
import { CONTEXT } from 'containers/AffiliatePage/constants';
import { makeSelectAffiliateSettings } from 'containers/AffiliatePage/selectors';
import reducer from 'containers/AffiliatePage/reducer';
import { usePopup } from './usePopup';

const stateSelector = createStructuredSelector({
  affiliateSettings: makeSelectAffiliateSettings(),
});

export const useAffiliate = () => {
  useInjectReducer({ key: CONTEXT, reducer });

  const dispatch = useDispatch();
  const { closePopup, resetPopup } = usePopup();

  const { affiliateSettings } = useSelector(stateSelector);

  const showAffiliateDialog = useCallback(() => {
    dispatch(showDialogAction(true));
    closePopup();
    resetPopup();
  }, []);

  const hideAffiliateDialog = useCallback(() => {
    dispatch(showDialogAction(false));
  }, []);

  const affiliateSuccess = useCallback(() => {
    dispatch(affiliateSuccessAction());
  }, []);

  return {
    affiliateSettings,
    showAffiliateDialog,
    hideAffiliateDialog,
    affiliateSuccess,
  };
};
