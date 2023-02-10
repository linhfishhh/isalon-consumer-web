/*
 *
 * NotificationList actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_NOTIFICATIONS,
  MARK_AS_READ_NOTIFICATION,
  GET_NOTIFICATION_COUNT,
  DELETE_NOTIFICATION,
  GET_MY_SHOP_NOTIFICATIONS,
  GET_SYSTEM_SHOP_NOTIFICATIONS,
  GET_SHOP_NOTIFICATION_COUNT,
  GET_COIN_NOTIFICATIONS,
} from './constants';

export const [
  getNotificationsRequest,
  getNotificationsSuccess,
  getNotificationsFail,
] = createSideEffectAction(GET_NOTIFICATIONS);

export const [
  markAsReadNotificationRequest,
  markAsReadNotificationSuccess,
  markAsReadNotificationFail,
] = createSideEffectAction(MARK_AS_READ_NOTIFICATION);

export const [
  getNotificationCountRequest,
  getNotificationCountSuccess,
  getNotificationCountFail,
] = createSideEffectAction(GET_NOTIFICATION_COUNT);

export const [
  deleteNotificationRequest,
  deleteNotificationSuccess,
  deleteNotificationFail,
] = createSideEffectAction(DELETE_NOTIFICATION);

export const [
  getMyShopNotificationsRequest,
  getMyShopNotificationsSuccess,
  getMyShopNotificationsFail,
] = createSideEffectAction(GET_MY_SHOP_NOTIFICATIONS);

export const [
  getSystemShopNotificationsRequest,
  getSystemShopNotificationsSuccess,
  getSystemShopNotificationsFail,
] = createSideEffectAction(GET_SYSTEM_SHOP_NOTIFICATIONS);

export const [
  getShopNotificationCountRequest,
  getShopNotificationCountSuccess,
  getShopNotificationCountFail,
] = createSideEffectAction(GET_SHOP_NOTIFICATION_COUNT);

export const [
  getCoinNotificationsRequest,
  getCoinNotificationsSuccess,
  getCoinNotificationsFail,
] = createSideEffectAction(GET_COIN_NOTIFICATIONS);
