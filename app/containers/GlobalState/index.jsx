/**
 *
 * GlobalState
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';

import Loading from 'containers/LoadingInPage';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { usePosition } from 'utils/hooks';

import { CONTEXT } from './constants';
import {
  getDefaultPositionAction,
  getProvinceByPositionAction,
  setCurrentLocationAction,
  getGlobalConfigRequest,
  getSearchConfigRequest,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectRefreshLocation,
  makeSelectGlobalConfig,
  makeSelectSearchConfig,
} from './selectors';

export function GlobalState(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const {
    getDefaultPosition,
    getProvinceByPosition,
    setCurrentLocation,
    refreshLocation,
    globalConfig,
    getGlobalConfig,
    searchConfig,
    getSearchConfig,
  } = props;
  const { position, error } = usePosition();

  useEffect(() => {
    getDefaultPosition();
    if (isEmpty(globalConfig)) {
      getGlobalConfig();
    }
    if (isEmpty(searchConfig)) {
      getSearchConfig();
    }
  }, []);

  useEffect(() => {
    if (position || refreshLocation) {
      getProvinceByPosition({ position });
    }
  }, [position, refreshLocation]);

  useEffect(() => {
    setCurrentLocation({ error });
  }, [error]);

  return <Loading />;
}

GlobalState.propTypes = {
  getDefaultPosition: PropTypes.func,
  getProvinceByPosition: PropTypes.func,
  setCurrentLocation: PropTypes.func,
  refreshLocation: PropTypes.bool,
  globalConfig: PropTypes.object,
  getGlobalConfig: PropTypes.func,
  searchConfig: PropTypes.object,
  getSearchConfig: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  refreshLocation: makeSelectRefreshLocation(),
  globalConfig: makeSelectGlobalConfig(),
  searchConfig: makeSelectSearchConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getDefaultPosition: () => dispatch(getDefaultPositionAction()),
    getProvinceByPosition: payload =>
      dispatch(getProvinceByPositionAction(payload)),
    setCurrentLocation: payload => dispatch(setCurrentLocationAction(payload)),
    getGlobalConfig: () => dispatch(getGlobalConfigRequest()),
    getSearchConfig: () => dispatch(getSearchConfigRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(GlobalState);
