import { lockScreen, disableTextZoom } from 'utils/screenOrientation';
import universalLinks from 'utils/universalLinks';
import dynamicLinks from 'utils/dynamicLinks';
import pushNotification from 'utils/pushNotification';
import codePush from './codePush';

const upgrade = async () => {
  await codePush.sync();
};

const deviceready = async () => {
  lockScreen();
  disableTextZoom();
  await upgrade();
  pushNotification.initialize();
  universalLinks.subscriber();
  dynamicLinks.subscriber();
};

const pause = async () => {};

const resume = async () => {
  await upgrade();
};

export default () => {
  if (window.cordova) {
    window.document.addEventListener('deviceready', deviceready);
    window.document.addEventListener('pause', pause);
    window.document.addEventListener('resume', resume);
  }
};
