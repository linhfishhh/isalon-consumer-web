import get from 'lodash/get';
import { isPlatformAndroid } from 'utils/platform';

export const Orientation = {
  PORTRAIT_PRIMARY: 'portrait-primary',
  PORTRAIT_SECONDARY: 'portrait-secondary',
  LANDSCAPE_PRIMARY: 'landscape-primary',
  LANDSCAPE_SECONDARY: 'landscape-secondary',
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
};

export const lockScreen = (orientation = Orientation.PORTRAIT_PRIMARY) => {
  const screenOrientation = get(window, 'screen.orientation');
  if (screenOrientation) {
    screenOrientation.lock(orientation);
  }
};

export const disableTextZoom = () => {
  if (isPlatformAndroid && window.MobileAccessibility) {
    window.MobileAccessibility.usePreferredTextZoom(false);
  }
};
