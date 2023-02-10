import { BrowserClient, Hub } from '@sentry/browser';
import { isNative, isPlatformIOS } from 'utils/platform';

const client = new BrowserClient({
  dsn:
    'https://577f30684b574b84b6e6f789ae27428c@o431596.ingest.sentry.io/5383162',
  environment: process.env.DEPLOY_ENV,
});

function getPLatfrom() {
  let result = 'browser';
  if (isNative) {
    result = isPlatformIOS ? 'iOS' : 'android';
  }
  return result;
}

const hub = new Hub(client);

hub.configureScope(scope => {
  scope.setTag('platform', getPLatfrom());
});

export default hub;
