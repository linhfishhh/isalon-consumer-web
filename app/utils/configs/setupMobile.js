import { isNative } from '../platform';
import { lockScreen } from '../screenOrientation';

(() => {
  if (isNative) {
    lockScreen();
  }
})();
