import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { CONTEXT } from 'containers/GlobalState/constants';
import reducer from 'containers/GlobalState/reducer';
import { makeSelectGlobalConfig } from 'containers/GlobalState/selectors';

import { useInjectReducer } from 'utils/injectReducer';

const stateSelector = createStructuredSelector({
  globalConfig: makeSelectGlobalConfig(),
});

export const useGlobalConfig = () => {
  useInjectReducer({ key: CONTEXT, reducer });

  const { globalConfig } = useSelector(stateSelector);

  return { globalConfig };
};
