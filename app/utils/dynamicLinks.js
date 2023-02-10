import { isNative, cordovaPlugins } from 'utils/platform';
import history from './history';

function subscriber() {
  if (isNative) {
    const plugins = cordovaPlugins();
    plugins.firebase.dynamiclinks.onDynamicLink(data => {
      const newUrl = new URL(data.deepLink);
      if (newUrl) {
        const { pathname, search } = newUrl;
        const newPath = pathname + search;
        history.push(newPath);
      }
    });
  }
}

export default { subscriber };
