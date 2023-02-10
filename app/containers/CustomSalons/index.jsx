/**
 *
 * CustomSalons
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import SalonList from 'components/SalonList';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

import { CONTEXT } from './constants';
import { getCustomSalonsRequest } from './actions';
import { makeSelectCustomSalons, makeSelectFetched } from './selectors';

function CustomSalons(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const { fetched, getCustomSalons, customSalons = [] } = props;

  useEffect(() => {
    if (!fetched) {
      getCustomSalons();
    }
  }, []);

  return (
    <>
      {customSalons.map(item => (
        <SalonList title={item.name} data={item.salons} key={item.id} />
      ))}
    </>
  );
}

CustomSalons.propTypes = {
  fetched: PropTypes.bool,
  getCustomSalons: PropTypes.func,
  customSalons: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  fetched: makeSelectFetched(),
  customSalons: makeSelectCustomSalons(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCustomSalons: () => dispatch(getCustomSalonsRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CustomSalons);
