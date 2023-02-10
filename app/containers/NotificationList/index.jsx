/**
 *
 * NotificationList
 *
 */

import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  MakeupIcon,
  ProductIcon,
  NotificationIcon,
  WalletIcon,
} from 'assets/svgIcon';
import { useHistory } from 'react-router-dom';
import get from 'lodash/get';
import { Paper, Grid, Typography, Divider, Button } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { path } from 'routers/path';
import useGlobalStyles from 'assets/styles';
import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import DocumentHead from 'components/DocumentHead';
import Tabs from 'components/Tabs';
import { TabView, Tab } from 'components/TabView';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isMobileOnly } from 'utils/platform';
import { dateFormat } from 'utils/dateTime';
import {
  makeSelectNotificationList,
  makeSelectNotificationLoading,
  makeSelectSystemShopNotifications,
  makeSelectMyShopNotifications,
  makeSelectPageShopNotification,
  makeSelectPageSystemShopNotification,
  makeSelectCoinNotifications,
  makeSelectPageCoinNotification,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { CONTEXT } from './constants';
import {
  getNotificationsRequest,
  markAsReadNotificationRequest,
  deleteNotificationRequest,
  getSystemShopNotificationsRequest,
  getMyShopNotificationsRequest,
  getCoinNotificationsRequest,
} from './actions';

import NotificationTable from './views/NotificationTable';
import ListContent from './views/ListContent';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: isMobileOnly ? 'white' : 'transperant',
    padding: isMobileOnly ? 0 : theme.spacing(10, 0),
  },
  paper_root: {
    width: '100%',
    padding: isMobileOnly ? theme.spacing(2, 0) : theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      width: '90%',
      padding: theme.spacing(10),
    },
    [theme.breakpoints.up('lg')]: {
      width: '70%',
    },
    minHeight: isMobileOnly ? '100%' : 400,
  },
  title_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
    fontWeight: 'bold',
  },
  normal_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
  },
  detail_text: {
    color: theme.palette.textColor[2],
    textAlign: 'left',
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  view_more: {
    width: '100%',
    height: 40,
    fontWeight: 'normal',
    marginTop: theme.spacing(4),
  },
  tabBar: {
    backgroundColor: theme.palette.backgroundColor[0],
  },
  appBar: {
    display: 'flex',
  },
  tableContent: {
    padding: theme.spacing(4),
  },
}));

const notificationTypes = [
  {
    id: 0,
    name: 'Hệ thống',
    icon: NotificationIcon,
  },
  {
    id: 1,
    name: 'Đặt lịch',
    icon: MakeupIcon,
  },
  {
    id: 2,
    name: 'Mua hàng',
    icon: ProductIcon,
  },
  {
    id: 3,
    name: 'Ví iSalon',
    icon: WalletIcon,
  },
];

function NotificationList(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationType, setNotificationType] = useState(
    notificationTypes[0],
  );

  const {
    loading,
    notifications,
    getNotifications,
    markAsReadNotification,
    deleteNotification,
    shopNotifications,
    systemShopNotifications,
    getShopNotifications,
    getSystemShopNotifications,
    pageShop,
    pageSystem,
    coinNotifications,
    pageCoin,
    getCoinNotifications,
  } = props;

  useEffect(() => {
    getNotifications({ page: currentPage });
  }, [currentPage]);

  useEffect(() => {
    getShopNotifications();
    getSystemShopNotifications();
    getCoinNotifications();
  }, []);

  const onLoadMore = () => {
    const tab = notificationType.id;
    if (tab === 1) {
      setCurrentPage(currentPage + 1);
    } else if (tab === 2) {
      const nextPage = pageShop.page + 1;
      getShopNotifications({ page: nextPage });
    } else if (tab === 0) {
      const nextPage = pageSystem.page + 1;
      getSystemShopNotifications({ page: nextPage });
    } else {
      const nextPage = pageCoin.page + 1;
      getCoinNotifications({ page: nextPage });
    }
  };

  const onReadNotification = useCallback((notificationId, type) => {
    markAsReadNotification(notificationId, type);
  }, []);

  const onDeleteNotification = useCallback((notificationId, type) => {
    deleteNotification(notificationId, type);
  }, []);

  const history = useHistory();
  const globalStyles = useGlobalStyles();

  const onDetailNotification = useCallback((data, type) => {
    if (type === 'booking') {
      const id = get(data, 'route.params.id');
      history.push(`${path.bookingHistory}?id=${id}`);
    } else if (type === 'shop') {
      const id = get(data, 'params.orderId');
      history.push(`${path.shoppingHistory}?id=${id}`);
    } else if (type === 'coin') {
      const newPath = `${path.wallet}${isMobileOnly ? '?snap=history' : ''}`;
      history.push(newPath);
    }
    if (!data.read) {
      onReadNotification(data.id, type);
    }
  }, []);

  const mapBookingNotifications = useMemo(
    () =>
      notifications.items.map(no => ({
        ...no,
        message: no.title,
        type: 'booking',
      })),
    [notifications],
  );

  const mapSystemShopNotifications = useMemo(
    () =>
      systemShopNotifications.map(no => ({
        id: no.userNotificationId,
        message: no.message,
        params: no.params,
        date: dateFormat(no.createdDate),
        read: no.read,
        type: 'system',
      })),
    [systemShopNotifications],
  );

  const mapMyShopNotifications = useMemo(
    () =>
      shopNotifications.map(no => ({
        id: no.userNotificationId,
        message: no.message,
        params: no.params,
        date: dateFormat(no.createdDate),
        read: no.read,
        type: 'shop',
        cover: no.image,
      })),
    [shopNotifications],
  );

  const mapCoinNotifications = useMemo(
    () =>
      coinNotifications.map(no => ({
        id: no.userNotificationId,
        message: no.message,
        params: no.params,
        date: dateFormat(no.createdDate),
        read: no.read,
        type: 'coin',
        cover: no.image,
      })),
    [coinNotifications],
  );

  const showLoadMore =
    (!get(notifications, 'isLast', false) && notificationType.id === 1) ||
    (!pageSystem.isLast && notificationType.id === 0) ||
    (!pageShop.isLast && notificationType.id === 2) ||
    (!pageCoin.isLast && notificationType.id === 3);

  const getNotificationList = type => {
    switch (type) {
      case 0:
        return mapSystemShopNotifications;
      case 1:
        return mapBookingNotifications;
      case 2:
        return mapMyShopNotifications;
      default:
        return mapCoinNotifications;
    }
  };

  const renderTab = (item, index, active) => {
    const { icon: Icon } = item;
    return (
      <Tab
        key={index}
        tabIndex={index}
        label={item.name}
        icon={<Icon active={active} />}
      />
    );
  };

  const renderTabContent = item => (
    <NotificationTable
      data={getNotificationList(item.id)}
      onRead={onReadNotification}
      onDelete={onDeleteNotification}
      onDetail={onDetailNotification}
    />
  );

  const onSelectedTabChange = useCallback(tab => {
    setNotificationType(tab);
  }, []);

  const onRenderLabel = useCallback(item => item.name, []);

  return (
    <BasePageView
      header={
        <>
          <Navigation title="Thông báo" color="primary" />
          <Tabs
            items={notificationTypes}
            renderLabel={onRenderLabel}
            onChanged={onSelectedTabChange}
            centered
          />
        </>
      }
      contentProps={{
        dataLength: getNotificationList(notificationType.id).length,
        onLoadMore,
        hasMore: showLoadMore,
        cornerRadiusColor: 'primary',
      }}
    >
      <DocumentHead title="Thông báo" description="Thông báo" />
      <div className={classes.root}>
        <Paper
          className={`${classes.paper_root} ${globalStyles.container}`}
          elevation={0}
        >
          {isMobileOnly ? (
            <ListContent
              loading={loading}
              items={getNotificationList(notificationType.id)}
              onRead={onReadNotification}
              onDelete={onDeleteNotification}
              onDetail={onDetailNotification}
            />
          ) : (
            <>
              <div>
                <Typography variant="h5" className={classes.title_text}>
                  THÔNG BÁO
                </Typography>
                <Typography className={classes.detail_text}>
                  Hãy xem thông báo thường xuyên để biết thêm những khuyến mãi
                </Typography>
                <Divider className={classes.divider} />
              </div>
              <Paper variant="outlined" className={classes.tableContent}>
                <Grid container>
                  <Grid item xs={12}>
                    <TabView
                      className={classes.tabBar}
                      tabs={notificationTypes}
                      renderTab={renderTab}
                      renderTabContent={renderTabContent}
                      onSelectedTabChange={onSelectedTabChange}
                    />
                  </Grid>
                  {showLoadMore && !loading && (
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.view_more}
                        startIcon={<ArrowDropDownIcon />}
                        onClick={onLoadMore}
                      >
                        Thông báo cũ hơn
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </>
          )}
        </Paper>
      </div>
    </BasePageView>
  );
}

NotificationList.propTypes = {
  notifications: PropTypes.object,
  loading: PropTypes.bool,
  getNotifications: PropTypes.func,
  markAsReadNotification: PropTypes.func,
  deleteNotification: PropTypes.func,
  shopNotifications: PropTypes.array,
  systemShopNotifications: PropTypes.array,
  getShopNotifications: PropTypes.func,
  getSystemShopNotifications: PropTypes.func,
  pageShop: PropTypes.object,
  pageSystem: PropTypes.object,
  pageCoin: PropTypes.object,
  coinNotifications: PropTypes.array,
  getCoinNotifications: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  notifications: makeSelectNotificationList(),
  loading: makeSelectNotificationLoading(),
  shopNotifications: makeSelectMyShopNotifications(),
  systemShopNotifications: makeSelectSystemShopNotifications(),
  pageShop: makeSelectPageShopNotification(),
  pageSystem: makeSelectPageSystemShopNotification(),
  coinNotifications: makeSelectCoinNotifications(),
  pageCoin: makeSelectPageCoinNotification(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getNotifications: payload => dispatch(getNotificationsRequest(payload)),
    markAsReadNotification: (notificationId, type) =>
      dispatch(markAsReadNotificationRequest({ notificationId, type })),
    deleteNotification: (notificationId, type) =>
      dispatch(deleteNotificationRequest({ notificationId, type })),
    getShopNotifications: payload =>
      dispatch(getMyShopNotificationsRequest(payload)),
    getSystemShopNotifications: payload =>
      dispatch(getSystemShopNotificationsRequest(payload)),
    getCoinNotifications: payload =>
      dispatch(getCoinNotificationsRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NotificationList);
