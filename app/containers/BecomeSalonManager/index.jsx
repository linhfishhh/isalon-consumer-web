/**
 *
 * BecomeSalonManager
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import DocumentHead from 'components/DocumentHead';

import { makeSelectBecomeSalonManagerCfg } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getBecomeSalonManagerCfgRequest } from './actions';
import { CONTEXT } from './constants';

import Header from './views/Header';
import Discovery from './views/Discovery';
import InstallApp from './views/InstallApp';
import AppDetail from './views/AppDetail';
import AppManagerDetail from './views/AppManagerDetail';
import Partner from './views/Partner';
import Review from './views/Review';
import JoinNow from './views/JoinNow';
import Footer from './views/Footer';

export function BecomeSalonManager(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const { mngConfig, getBecomeSalonManagerCfg } = props;

  useEffect(() => {
    getBecomeSalonManagerCfg();
    AOS.init();
  }, []);

  return (
    <>
      <DocumentHead title="Đăng ký chủ salon" description="Đăng ký chủ salon" />
      <Header cfg={mngConfig} />
      <Discovery cfg={mngConfig} />
      <InstallApp cfg={mngConfig} />
      <AppDetail cfg={mngConfig} />
      <AppManagerDetail cfg={mngConfig} />
      <Partner cfg={mngConfig} />
      <Review cfg={mngConfig} />
      <JoinNow cfg={mngConfig} />
      <Footer />
    </>
  );
}

BecomeSalonManager.propTypes = {
  mngConfig: PropTypes.object,
  getBecomeSalonManagerCfg: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  mngConfig: makeSelectBecomeSalonManagerCfg(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getBecomeSalonManagerCfg: () => dispatch(getBecomeSalonManagerCfgRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BecomeSalonManager);
