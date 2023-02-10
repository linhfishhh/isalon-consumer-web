/*
 *
 * Header actions
 *
 */

import { createSingleAction } from 'utils/reduxHelper';
import { SHOW_CART_NOTIFICATION } from './constants';

export const showCartNotificationRequest = createSingleAction(
  SHOW_CART_NOTIFICATION,
);
