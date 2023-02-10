import { isNative, isMobileOnly } from 'utils/platform';
import history from 'utils/history';
import { notificationType } from 'utils/enums';
import get from 'lodash/get';
import { path } from 'routers/path';

function getOneSignal() {
  return isNative ? window.plugins.OneSignal : window.OneSignal;
}

function initialize() {
  const oneSignalAppId = process.env.ONESIGNAL_APP_ID;
  const OneSignal = getOneSignal();
  if (OneSignal) {
    if (isNative) {
      const iosSettings = {};
      iosSettings.kOSSettingsKeyAutoPrompt = true;
      iosSettings.kOSSettingsKeyInAppLaunchURL = true;
      OneSignal.startInit(oneSignalAppId)
        .handleNotificationReceived(jsonData => {
          handleDataNotification(jsonData);
        })
        .handleNotificationOpened(jsonData => {
          handleDataNotification(jsonData);
        })
        .iOSSettings(iosSettings)
        .endInit();
    } else {
      OneSignal.push(() => {
        OneSignal.init({
          appId: oneSignalAppId,
        });
        // OneSignal.on('notificationDisplay', jsonData => {
        //   handleDataNotification(jsonData);
        // });
      });
      OneSignal.push([
        'addListenerForNotificationOpened',
        jsonData => {
          handleDataNotification(jsonData);
        },
      ]);
    }
  }
}

function sendTags(data) {
  const OneSignal = getOneSignal();
  if (OneSignal) {
    if (isNative) {
      OneSignal.sendTags(data);
    } else {
      OneSignal.push(() => {
        OneSignal.sendTags(data);
      });
    }
  }
}

function deleteTags(tags) {
  const OneSignal = getOneSignal();
  if (OneSignal) {
    if (isNative) {
      OneSignal.deleteTags(tags);
    } else {
      OneSignal.push(() => {
        OneSignal.deleteTags(tags);
      });
    }
  }
}

function handleDataNotification(data) {
  const additionalData = isNative
    ? get(data, 'notification.payload.additionalData')
    : get(data, 'data');
  const type = notificationType.typeOfValue(additionalData.type);
  let destinationPath = path.notification;
  switch (type) {
    case 'SYSTEM': {
      const url = get(additionalData, 'url');
      const newUrl = new URL(url);
      if (newUrl) {
        const { pathname, search } = newUrl;
        destinationPath = pathname + search;
      }
      break;
    }
    case 'BOOKING': {
      const id = get(additionalData, 'order_id');
      destinationPath = `${path.bookingHistory}?id=${id}`;
      break;
    }
    case 'SHOP': {
      const id = get(additionalData, 'orderId');
      destinationPath = `${path.shoppingHistory}?id=${id}`;
      break;
    }
    case 'COIN': {
      destinationPath = `${path.wallet}${isMobileOnly ? '?snap=history' : ''}`;
      break;
    }
    default:
      break;
  }
  if (type !== 'UNKNOWN') {
    history.push(destinationPath);
  }
}

export default { initialize, sendTags, deleteTags };
