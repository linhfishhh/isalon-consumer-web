import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { CONTEXT } from 'containers/GlobalState/constants';
import reducer from 'containers/GlobalState/reducer';
import {
  makeSelectCurrentLocation,
  makeSelectProvinceList,
} from 'containers/GlobalState/selectors';

import { useInjectReducer } from 'utils/injectReducer';

const stateSelector = createStructuredSelector({
  currentLocation: makeSelectCurrentLocation(),
  provinces: makeSelectProvinceList(),
});

export const useCurrentLocation = () => {
  useInjectReducer({ key: CONTEXT, reducer });

  const { currentLocation, provinces } = useSelector(stateSelector);

  return { currentLocation, provinces };
};
