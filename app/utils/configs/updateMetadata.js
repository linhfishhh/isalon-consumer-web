import { storageCryptData, storageKeys } from '../localStorage';
import { removeProvinces } from '../localStorage/provinces';
(() => {
  const currentVersion = storageCryptData.getItem(
    storageKeys.CURRENT_VERSION,
    false,
  );
  if (currentVersion !== VERSION) {
    removeProvinces();
    storageCryptData.setItem(storageKeys.CURRENT_VERSION, VERSION, false);
  }
})();
