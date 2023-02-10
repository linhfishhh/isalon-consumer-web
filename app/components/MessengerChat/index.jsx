import React, { memo } from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';

const fbAppId = process.env.FACEBOOK_APP_ID;
const fbPageId = process.env.FACEBOOK_PAGE_ID;

function MessengerChat() {
  return <MessengerCustomerChat pageId={fbPageId} appId={fbAppId} />;
}

export default memo(MessengerChat);
