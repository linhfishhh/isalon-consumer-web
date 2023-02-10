import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { CONTEXT } from 'containers/GlobalState/constants';
import reducer from 'containers/GlobalState/reducer';
import { makeSelectSearchConfig } from 'containers/GlobalState/selectors';

import { useInjectReducer } from 'utils/injectReducer';

const stateSelector = createStructuredSelector({
  searchConfig: makeSelectSearchConfig(),
});

export const useSearchConfig = () => {
  useInjectReducer({ key: CONTEXT, reducer });

  const { searchConfig } = useSelector(stateSelector);

  return { searchConfig };
};
