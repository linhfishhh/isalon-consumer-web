import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { updateStackNumberPageAction } from 'containers/GlobalState/actions';
import { CONTEXT } from 'containers/GlobalState/constants';
import reducer from 'containers/GlobalState/reducer';
import { makeSelectStackNumberPage } from 'containers/GlobalState/selectors';

import { useInjectReducer } from 'utils/injectReducer';

const stateSelector = createStructuredSelector({
  stackNumberPage: makeSelectStackNumberPage(),
});

export const useStackPage = () => {
  useInjectReducer({ key: CONTEXT, reducer });

  const dispatch = useDispatch();
  const { stackNumberPage } = useSelector(stateSelector);

  const updateStackNumberPage = () => {
    dispatch(updateStackNumberPageAction());
  };

  useEffect(() => {
    updateStackNumberPage();
  }, []);

  const isFirstPage = stackNumberPage === 1;

  return { isFirstPage };
};
