import { isMobileOnly as isMobile } from 'react-device-detect';

function platformAndroid() {
  if (window.cordova && window.cordova.platformId === 'android') {
    return true;
  }
  return false;
}

function platformIOS() {
  if (window.cordova && window.cordova.platformId === 'ios') {
    return true;
  }
  return false;
}

export function cordovaPlugins() {
  if (window.cordova) {
    return window.cordova.plugins;
  }
  return false;
}

export const isNative = window.cordova !== undefined;
export const isPlatformAndroid = platformAndroid();
export const isPlatformIOS = platformIOS();
export const isMobileOnly = isMobile || isNative;
