/*
 * MainTabs Messages
 *
 * This contains all the text for the MainTabs container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MainTabs';

export default defineMessages({
  booking: {
    id: `${scope}.booking`,
    defaultMessage: 'Đặt lịch',
  },
  shop: {
    id: `${scope}.shop`,
    defaultMessage: 'iShop',
  },
  account: {
    id: `${scope}.account`,
    defaultMessage: 'Tài khoản',
  },
  promotion: {
    id: `${scope}.promotion`,
    defaultMessage: 'Ưu đãi',
  },
  history: {
    id: `${scope}.history`,
    defaultMessage: 'Lịch sử',
  },
});
