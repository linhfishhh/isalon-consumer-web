/*
 *
 * NotificationList reducer
 *
 */
import produce from 'immer';
import { get, remove } from 'lodash';
import {
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATION_COUNT_SUCCESS,
  MARK_AS_READ_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_SUCCESS,
  GET_SHOP_NOTIFICATION_COUNT_SUCCESS,
  GET_MY_SHOP_NOTIFICATIONS_SUCCESS,
  GET_SYSTEM_SHOP_NOTIFICATIONS_SUCCESS,
  GET_COIN_NOTIFICATIONS_SUCCESS,
} from './constants';

export const initialState = {
  loading: true,
  notifications: {
    items: [],
    isLast: false,
  },
  notificationCount: 0,
  shopNotifications: [],
  systemShopNotifications: [],
  coinNotifications: [],
  shopNotificationCount: 0,
  pageShopNotification: {
    page: 0,
    isLast: false,
  },
  pageSystemShopNotification: {
    page: 0,
    isLast: false,
  },
  pageCoinNotification: {
    page: 0,
    isLast: false,
  },
};

const notificationListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_NOTIFICATIONS_SUCCESS: {
        const cloneDraft = draft;
        const payload = get(action, 'payload');
        const { currentPage = 1, isLast = false, items = [] } = payload;
        const obj = cloneDraft.notifications;
        if (currentPage === 1) {
          obj.items = items;
        } else {
          obj.items = [...obj.items, ...items];
        }
        obj.isLast = isLast;
        cloneDraft.notifications = obj;
        cloneDraft.loading = false;
        break;
      }
      case GET_NOTIFICATION_COUNT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.notificationCount = get(action, 'payload', 0);
        break;
      }
      case MARK_AS_READ_NOTIFICATION_SUCCESS: {
        const cloneDraft = draft;
        const id = get(action, 'payload.notificationId', -1);
        const { type } = action.payload;
        if (type === 'booking') {
          const notifications = { ...cloneDraft.notifications };
          const { items } = notifications;
          const item = items.find(el => el.id === id);
          if (item) {
            item.read = true;
            cloneDraft.notifications = notifications;
          }
        } else if (type === 'shop') {
          const notifications = [...state.shopNotifications];
          const item = notifications.find(el => el.userNotificationId === id);
          if (item) {
            item.read = true;
            cloneDraft.shopNotifications = notifications;
            cloneDraft.shopNotificationCount = state.shopNotificationCount - 1;
          }
        } else if (type === 'coin') {
          const notifications = [...state.coinNotifications];
          const item = notifications.find(el => el.userNotificationId === id);
          if (item) {
            item.read = true;
            cloneDraft.coinNotifications = notifications;
            cloneDraft.shopNotificationCount = state.shopNotificationCount - 1;
          }
        }
        break;
      }
      case DELETE_NOTIFICATION_SUCCESS: {
        const cloneDraft = draft;
        const id = get(action, 'payload.notificationId', -1);
        const { type } = action.payload;
        if (type === 'booking') {
          const notifications = { ...cloneDraft.notifications };
          const { items } = notifications;
          const removed = remove(items, el => el.id === id);
          if (removed) {
            cloneDraft.notifications = notifications;
          }
        } else if (type === 'shop') {
          const notifications = [...cloneDraft.shopNotifications];
          const removed = remove(
            notifications,
            el => el.userNotificationId === id,
          );
          if (removed) {
            cloneDraft.shopNotifications = notifications;
            cloneDraft.shopNotificationCount = state.shopNotificationCount - 1;
          }
        } else if (type === 'coin') {
          const notifications = [...cloneDraft.coinNotifications];
          const removed = remove(
            notifications,
            el => el.userNotificationId === id,
          );
          if (removed) {
            cloneDraft.coinNotifications = notifications;
            cloneDraft.shopNotificationCount = state.shopNotificationCount - 1;
          }
        }
        break;
      }
      case GET_SHOP_NOTIFICATION_COUNT_SUCCESS: {
        const cloneDraft = draft;
        const number = get(action, 'payload.data.number', 0);
        cloneDraft.shopNotificationCount = number;
        break;
      }
      case GET_MY_SHOP_NOTIFICATIONS_SUCCESS: {
        const cloneDraft = draft;
        const data = get(action, 'payload.data', 0);
        if (data.first) {
          cloneDraft.shopNotifications = data.content;
        } else {
          cloneDraft.shopNotifications = [
            ...cloneDraft.shopNotifications,
            ...data.content,
          ];
        }
        cloneDraft.pageShopNotification.isLast = data.last;
        cloneDraft.pageShopNotification.page = data.pageable.pageNumber;
        break;
      }
      case GET_SYSTEM_SHOP_NOTIFICATIONS_SUCCESS: {
        const cloneDraft = draft;
        const data = get(action, 'payload.data', 0);
        if (data.first) {
          cloneDraft.systemShopNotifications = data.content;
        } else {
          cloneDraft.systemShopNotifications = [
            ...cloneDraft.systemShopNotifications,
            ...data.content,
          ];
        }
        cloneDraft.pageSystemShopNotification.isLast = data.last;
        cloneDraft.pageSystemShopNotification.page = data.pageable.pageNumber;
        break;
      }
      case GET_COIN_NOTIFICATIONS_SUCCESS: {
        const cloneDraft = draft;
        const data = get(action, 'payload.data', 0);
        if (data.first) {
          cloneDraft.coinNotifications = data.content;
        } else {
          cloneDraft.coinNotifications = [
            ...cloneDraft.coinNotifications,
            ...data.content,
          ];
        }
        cloneDraft.pageCoinNotification.isLast = data.last;
        cloneDraft.pageCoinNotification.page = data.pageable.pageNumber;
        break;
      }
      default:
        break;
    }
  });

export default notificationListReducer;
