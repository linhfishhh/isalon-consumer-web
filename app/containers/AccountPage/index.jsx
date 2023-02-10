/**
 *
 * AccountPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';

import BasePageView from 'components/BasePageView';
import DocumentHead from 'components/DocumentHead';

import { TABBAR_BOTTOM_HEIGHT } from 'utils/constants';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useAuthentication } from 'utils/hooks';

import { makeSelectTotalNotificationCount } from 'containers/NotificationList/selectors';
import notificationReducer from 'containers/NotificationList/reducer';
import notificationSaga from 'containers/NotificationList/saga';
import {
  getNotificationCountRequest,
  getShopNotificationCountRequest,
} from 'containers/NotificationList/actions';
import { CONTEXT as NOTIFICATION_CONTEXT } from 'containers/NotificationList/constants';

import { CONTEXT } from './constants';
import makeSelectAccountPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import MenuList from './views/MenuList';
import Welcome from './views/Welcome';
import Summary from './views/Summary';

export function AccountPage(props) {
  useInjectReducer({ key: NOTIFICATION_CONTEXT, reducer: notificationReducer });
  useInjectSaga({ key: NOTIFICATION_CONTEXT, saga: notificationSaga });
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const {
    authenticated,
    showSignInDialog,
    logout,
    showInviteDialog,
  } = useAuthentication();

  const {
    getNotificationCount,
    notificationCount,
    getShopNotificationCount,
  } = props;

  useEffect(() => {
    if (authenticated) {
      getNotificationCount();
      getShopNotificationCount();
    }
  }, [authenticated]);

  return (
    <BasePageView
      contentProps={{
        paddingTop: 0,
        paddingBottom: TABBAR_BOTTOM_HEIGHT,
      }}
    >
      <DocumentHead title="Tài khoản" description="Tài khoản" />
      <Grid container direction="column">
        <Grid item>
          {authenticated ? (
            <Summary badgeNotify={notificationCount} />
          ) : (
            <Welcome signIn={showSignInDialog} />
          )}
        </Grid>
        <Grid item>
          <MenuList
            authenticated={authenticated}
            onSignIn={showSignInDialog}
            onSignOut={logout}
            onShowInvite={showInviteDialog}
          />
        </Grid>
      </Grid>
    </BasePageView>
  );
}

AccountPage.propTypes = {
  getNotificationCount: PropTypes.func,
  notificationCount: PropTypes.number,
  getShopNotificationCount: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  accountPage: makeSelectAccountPage(),
  notificationCount: makeSelectTotalNotificationCount(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getNotificationCount: () => dispatch(getNotificationCountRequest()),
    getShopNotificationCount: () => dispatch(getShopNotificationCountRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountPage);
