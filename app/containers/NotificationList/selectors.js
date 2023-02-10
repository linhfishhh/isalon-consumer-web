import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the notificationList state domain
 */

const selectNotificationListDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NotificationList
 */

const makeSelectNotificationList = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.notifications,
  );

const makeSelectNotificationCount = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.notificationCount,
  );

const makeSelectNotificationLoading = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.loading,
  );

const makeSelectMyShopNotifications = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.shopNotifications,
  );

const makeSelectSystemShopNotifications = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.systemShopNotifications,
  );

const makeSelectShopNotificationCount = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.shopNotificationCount,
  );

const makeSelectTotalNotificationCount = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.shopNotificationCount + substate.notificationCount,
  );

const makeSelectFirstPageShopNotifications = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.shopNotifications.slice(0, 5),
  );

const makeSelectFirstPageSystemShopNotifications = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.systemShopNotifications.slice(0, 5),
  );

const makeSelectPageShopNotification = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.pageShopNotification,
  );

const makeSelectPageSystemShopNotification = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.pageSystemShopNotification,
  );

const makeSelectCoinNotifications = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.coinNotifications,
  );

const makeSelectFirstPageCoinNotifications = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.coinNotifications.slice(0, 5),
  );

const makeSelectPageCoinNotification = () =>
  createSelector(
    selectNotificationListDomain,
    substate => substate.pageCoinNotification,
  );

export {
  makeSelectNotificationList,
  makeSelectNotificationCount,
  makeSelectNotificationLoading,
  makeSelectMyShopNotifications,
  makeSelectSystemShopNotifications,
  makeSelectShopNotificationCount,
  makeSelectTotalNotificationCount,
  makeSelectFirstPageShopNotifications,
  makeSelectPageShopNotification,
  makeSelectPageSystemShopNotification,
  makeSelectFirstPageSystemShopNotifications,
  makeSelectCoinNotifications,
  makeSelectFirstPageCoinNotifications,
  makeSelectPageCoinNotification,
};
