/**
 *
 * BecomeSalonManager
 *
 */

import React, { memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import { isMobileOnly } from 'utils/platform';

import styles from 'assets/styles';
import DocumentHead from 'components/DocumentHead';
import GlobalHeader from 'containers/Header';
import Footer from 'containers/ContactPage/views/Footer';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectPrivacy } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getPrivacyRequest } from './actions';
import { CONTEXT } from './constants';
import useStyles from './styles';

export function PrivacyPage(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyles();
  const globalStyle = styles();

  const { tos, getPrivacy } = props;

  useEffect(() => {
    getPrivacy();
  }, []);

  const html = useMemo(
    () => ({
      __html: tos,
    }),
    [tos],
  );

  return (
    <BasePageView
      header={<Navigation color="primary" title="Điều khoản dịch vụ" />}
    >
      <DocumentHead
        title="Điều khoản dịch vụ"
        description="Điều khoản dịch vụ"
      />

      {!isMobileOnly && <GlobalHeader />}
      <div className={classes.mainContent}>
        <div className={globalStyle.container}>
          <div
            className={classes.tosContent}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={html}
          />
        </div>
      </div>
      <Footer />
    </BasePageView>
  );
}

PrivacyPage.propTypes = {
  tos: PropTypes.string,
  getPrivacy: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  tos: makeSelectPrivacy(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getPrivacy: () => dispatch(getPrivacyRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PrivacyPage);
