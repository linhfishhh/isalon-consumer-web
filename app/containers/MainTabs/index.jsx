/**
 *
 * MainTabs
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import AccountPage from 'containers/AccountPage/Loadable';
import HistoryPage from 'containers/HistoryPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import BookingHomePage from 'containers/BookingHomePage/Loadable';
import ProductHomePage from 'containers/ProductHomePage/Loadable';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { path } from 'routers/path';

import { ReactComponent as HomeIcon } from 'assets/icons/tabbar/home.svg';
import { ReactComponent as BookingIcon } from 'assets/icons/tabbar/booking.svg';
import { ReactComponent as ShopIcon } from 'assets/icons/tabbar/shop.svg';
import { ReactComponent as HistoryIcon } from 'assets/icons/tabbar/history.svg';
import { ReactComponent as AccountIcon } from 'assets/icons/tabbar/account.svg';

import { ReactComponent as BookingActiveIcon } from 'assets/icons/tabbar/booking_active.svg';
import { ReactComponent as ShopActiveIcon } from 'assets/icons/tabbar/shop_active.svg';
import { ReactComponent as HistoryActiveIcon } from 'assets/icons/tabbar/history_active.svg';
import { ReactComponent as AccountActiveIcon } from 'assets/icons/tabbar/account_active.svg';

import { Switch, Route } from 'react-router-dom';
import saga from './saga';
import reducer from './reducer';

const tabs = [
  {
    index: 0,
    id: 'booking',
    icon: <BookingIcon className="icon" />,
    iconActive: <BookingActiveIcon className="icon" />,
    component: BookingHomePage,
    path: path.bookingHome,
    label: 'Đặt lịch',
  },
  {
    index: 1,
    id: 'shop',
    icon: <ShopIcon className="icon" />,
    iconActive: <ShopActiveIcon className="icon" />,
    component: ProductHomePage,
    path: path.productHome,
    label: 'iShop',
  },
  {
    index: 2,
    id: 'home',
    icon: <HomeIcon className="home-icon" />,
    iconActive: <HomeIcon className="home-icon" />,
    component: HomePage,
    path: path.home,
  },
  {
    index: 3,
    id: 'history',
    icon: <HistoryIcon className="icon" />,
    iconActive: <HistoryActiveIcon className="icon" />,
    component: HistoryPage,
    path: path.history,
    label: 'Lịch sử',
  },
  {
    index: 4,
    id: 'account',
    icon: <AccountIcon className="icon" />,
    iconActive: <AccountActiveIcon className="icon" />,
    component: AccountPage,
    path: path.account,
    label: 'Tài khoản',
  },
];

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: '100%',
  },
  tabContent: {
    width: '100%',
    height: '100%',
    '& .react-swipeable-view-container': {
      width: '100%',
      height: '100%',
    },
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    position: 'relative',
  },
  tabsWrapper: {
    width: '100%',
    position: 'fixed',
    backgroundColor: '#fff',
    paddingBottom: 'env(safe-area-inset-bottom)',
    bottom: 0,
    zIndex: 2,
  },
  tabs: {
    height: 50,
    '& .Mui-selected': {
      padding: 0,
      fontSize: 12,
    },
    width: '100%',
    borderTop: 'solid 1px #eeeeee',
  },
  tab: {
    padding: '0 !important',
    minWidth: 'auto',
    '& .icon': {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    '& .home-icon': {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    '& span': {
      marginTop: theme.spacing(1),
    },
  },
  label: {
    '& .MuiBottomNavigationAction-label, .Mui-selected': {
      color: `rgba(0,0,0,0.54)`,
    },
  },
  labelActive: {
    '& .MuiBottomNavigationAction-label': {
      color: theme.palette.primary.main,
    },
  },
}));

export function MainTabs({ history }) {
  useInjectReducer({ key: 'mainTabs', reducer });
  useInjectSaga({ key: 'mainTabs', saga });

  const currentTab =
    tabs.find(t => t.path === history.location.pathname) || tabs[2];
  const [tabActive, setTabActive] = useState(currentTab.index);
  const classes = useStyles();

  useEffect(() => {
    const { pathname } = history.location;
    if (pathname === path.affiliate) {
      setTabActive(2);
    } else {
      tabs.forEach(tab => {
        if (tab.path === pathname && tab.index !== tabActive) {
          setTabActive(tab.index);
        }
      });
    }
  }, [history.location.pathname]);

  const handleChangeTab = useCallback((event, newValue) => {
    setTabActive(newValue);
  }, []);

  useEffect(() => {
    history.replace(tabs[tabActive].path);
  }, [tabActive]);

  return (
    <div>
      <Switch>
        {tabs.map(tab => (
          <Route
            key={tab.path}
            path={tab.path}
            component={tab.component}
            exact
          />
        ))}
        <Route path={path.affiliate} component={HomePage} exact />
      </Switch>
      <div className={classes.tabsWrapper}>
        <BottomNavigation
          value={tabActive}
          onChange={handleChangeTab}
          className={classes.tabs}
          showLabels
        >
          {tabs.map((tab, index) => (
            <BottomNavigationAction
              key={tab.id}
              icon={tabActive === index ? tab.iconActive : tab.icon}
              className={
                tabActive === index
                  ? `${classes.tab} ${classes.labelActive}`
                  : `${classes.tab} ${classes.label}`
              }
              label={tab.label}
            />
          ))}
        </BottomNavigation>
      </div>
    </div>
  );
}

MainTabs.propTypes = {
  history: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MainTabs);
