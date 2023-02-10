import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { showPopupAction } from 'containers/Popup/actions';
import { CONTEXT } from 'containers/Popup/constants';
import reducer from 'containers/Popup/reducer';
import { resetShowPopup } from 'utils/popup';

import { useInjectReducer } from 'utils/injectReducer';

export const usePopup = () => {
  useInjectReducer({ key: CONTEXT, reducer });

  const dispatch = useDispatch();

  const showPopup = useCallback(() => {
    dispatch(showPopupAction(true));
  }, []);

  const closePopup = useCallback(() => {
    dispatch(showPopupAction(false));
  }, []);

  const resetPopup = useCallback(() => {
    resetShowPopup();
  }, []);

  return { showPopup, closePopup, resetPopup };
};
