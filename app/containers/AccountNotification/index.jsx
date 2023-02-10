/**
 *
 * AccountNotification
 *
 */

import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, AppBar, Tabs, Tab } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import {
  getNotificationsRequest,
  getMyShopNotificationsRequest,
  getSystemShopNotificationsRequest,
  getCoinNotificationsRequest,
} from 'containers/NotificationList/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectNotificationList,
  makeSelectFirstPageShopNotifications,
  makeSelectFirstPageSystemShopNotifications,
  makeSelectFirstPageCoinNotifications,
} from 'containers/NotificationList/selectors';

import { dateFormat } from 'utils/dateTime';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import EmptyPage from 'components/EmptyPage';
import NotificationItem from 'components/NotificationItem';

import { CONTEXT } from 'containers/NotificationList/constants';
import saga from 'containers/NotificationList/saga';
import reducer from 'containers/NotificationList/reducer';
import {
  NotificationIcon,
  MakeupIcon,
  ProductIcon,
  WalletIcon,
} from 'assets/svgIcon';

const stateSelector = createStructuredSelector({
  notifications: makeSelectNotificationList(),
  shopNotifications: makeSelectFirstPageShopNotifications(),
  systemNotifications: makeSelectFirstPageSystemShopNotifications(),
  coinNotifications: makeSelectFirstPageCoinNotifications(),
});

const useStyle = makeStyles(theme => ({
  wrapper: {
    width: 360,
    maxHeight: 305,
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    padding: theme.spacing(4),
    flexGrow: 1,
    overflow: 'auto',
  },
  line: {
    marginBottom: 10,
    marginTop: 10,
  },
  tabBar: {
    backgroundColor: theme.palette.backgroundColor[0],
    '& button': {
      minWidth: 'auto',
    },
  },
  appBar: {
    width: '100%',
  },
  empty: {
    padding: 0,
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number,
};

const AccountNotification = () => {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyle();
  const {
    notifications = {},
    shopNotifications = [],
    systemNotifications = [],
    coinNotifications = [],
  } = useSelector(stateSelector);

  const bookingNotifications = notifications.items || {};

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotificationsRequest());
    dispatch(getMyShopNotificationsRequest());
    dispatch(getSystemShopNotificationsRequest());
    dispatch(getCoinNotificationsRequest());
  }, []);
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const emptyPage = useMemo(
    () => (
      <EmptyPage
        className={classes.empty}
        title="Không có thông báo"
        subTitle="Bạn chưa có thông báo nào, khi nào có chúng sẽ hiển thị tại đây"
      />
    ),
    [],
  );

  return (
    <div className={classes.wrapper}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          variant="fullWidth"
          scrollButtons="off"
          className={classes.tabBar}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<NotificationIcon />} {...a11yProps(0)} />
          <Tab icon={<MakeupIcon />} {...a11yProps(1)} />
          <Tab icon={<ProductIcon />} {...a11yProps(2)} />
          <Tab icon={<WalletIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <div className={classes.list} component="div">
        <TabPanel value={value} index={0}>
          <div className={classes.listContent}>
            {isEmpty(systemNotifications)
              ? emptyPage
              : systemNotifications.map((item, index) => (
                  <React.Fragment key={`system-${item.id || index}`}>
                    <NotificationItem
                      data={{
                        title: item.message,
                        date: dateFormat(item.createdDate),
                        read: item.read,
                      }}
                      type="system"
                    />
                    {index < notifications.length - 1 && (
                      <Divider className={classes.line} component="div" />
                    )}
                  </React.Fragment>
                ))}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className={classes.listContent}>
            {isEmpty(bookingNotifications)
              ? emptyPage
              : bookingNotifications.map((item, index) => (
                  <React.Fragment key={item.id || index}>
                    <NotificationItem data={item} type="booking" />
                    {index < notifications.length - 1 && (
                      <Divider className={classes.line} component="div" />
                    )}
                  </React.Fragment>
                ))}
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className={classes.listContent}>
            {isEmpty(shopNotifications)
              ? emptyPage
              : shopNotifications.map((item, index) => (
                  <React.Fragment key={`shop-${item.id || index}`}>
                    <NotificationItem
                      data={{
                        title: item.message,
                        date: dateFormat(item.createdDate),
                        read: item.read,
                        cover: item.image,
                        params: item.params,
                      }}
                      type="shop"
                    />
                    {index < notifications.length - 1 && (
                      <Divider className={classes.line} component="div" />
                    )}
                  </React.Fragment>
                ))}
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div className={classes.listContent}>
            {isEmpty(coinNotifications)
              ? emptyPage
              : coinNotifications.map((item, index) => (
                  <React.Fragment key={item.id || index}>
                    <NotificationItem
                      data={{
                        title: item.message,
                        date: dateFormat(item.createdDate),
                        read: item.read,
                        cover: item.image,
                      }}
                      type="coin"
                    />
                    {index < notifications.length - 1 && (
                      <Divider className={classes.line} component="div" />
                    )}
                  </React.Fragment>
                ))}
          </div>
        </TabPanel>
      </div>
    </div>
  );
};

export default AccountNotification;
