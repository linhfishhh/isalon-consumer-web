import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { isNative } from 'utils/platform';

(() => {
  if (process.env.NODE_ENV === 'production' && !isNative) {
    OfflinePluginRuntime.install({
      onUpdating: () => {},
      onUpdateReady: () => {
        // Update is applied here
        OfflinePluginRuntime.applyUpdate();
      },
      onUpdated: () => {
        // Force reload happens here
        window.location.reload();
      },
      onUpdateFailed: () => {},
    });
  }
})();
