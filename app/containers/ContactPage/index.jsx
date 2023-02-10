/* eslint-disable no-alert */
/**
 *
 * BecomeSalonManager
 *
 */

import React, { memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import styles from 'assets/styles';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import GlobalHeader from 'containers/Header';
import DocumentHead from 'components/DocumentHead';
import { makeSelectContactPageCfg } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getContactPageCfgRequest, sendContactRequest } from './actions';
import { CONTEXT } from './constants';
import Header from './views/Header';
import useStyles from './styles';
import Address from './views/Address';
import Contact from './views/Contact';
import Footer from './views/Footer';

export function BecomeSalonManager(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyles();
  const globalStyle = styles();

  const { contactCfg, getContactPageCfg, sendContact } = props;

  useEffect(() => {
    getContactPageCfg();
  }, []);

  const onSend = useCallback(params => {
    sendContact({
      ...params,
      success: () => {
        alert('Cám ơn bạn đã liên hệ với chúng tôi!');
      },
      fail: () => {
        alert('Đã có lỗi xảy ra, xin vui lòng thử lại sau!');
      },
    });
  }, []);

  return (
    <>
      <DocumentHead title="Liên hệ chúng tôi" description="Liên hệ chúng tôi" />

      <GlobalHeader />
      <Header cfg={contactCfg} />
      <div className={classes.mainContent}>
        <div className={globalStyle.container}>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <Contact onSend={onSend} />
            </Grid>
            <Grid item xs={6}>
              <Address cfg={contactCfg} />
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </>
  );
}

BecomeSalonManager.propTypes = {
  contactCfg: PropTypes.object,
  getContactPageCfg: PropTypes.func,
  sendContact: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  contactCfg: makeSelectContactPageCfg(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getContactPageCfg: () => dispatch(getContactPageCfgRequest()),
    sendContact: params => dispatch(sendContactRequest(params)),
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
