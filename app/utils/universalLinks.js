import { isNative } from 'utils/platform';
import history from './history';

function subscriber() {
  if (isNative) {
    universalLinks.subscribe(null, eventData => {
      const { host, url, params } = eventData;
      let newUrl;
      if (host === process.env.HOST_NAME) {
        newUrl = new URL(url);
      } else {
        newUrl = new URL(params.link);
      }
      if (newUrl) {
        const { pathname, search } = newUrl;
        const newPath = pathname + search;
        history.push(newPath);
      }
    });
  }
}

function redirectLink(link) {
  const newUrl = new URL(link);
  const { host, pathname, search } = newUrl;
  if (host === process.env.HOST_NAME) {
    const newPath = pathname + search;
    history.push(newPath);
  } else {
    window.open(link);
  }
}

export default { subscriber, redirectLink };
