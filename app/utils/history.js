import { createHashHistory, createBrowserHistory } from 'history';
import get from 'lodash/get';
import { isNative } from 'utils/platform';
import { queryStringFromString } from 'utils/stringFormat';

const history = isNative ? createHashHistory() : createBrowserHistory();

history.listen(location => {
  let keepScrollLocation = get(location, 'state.keepScrollLocation', false);
  const search = get(location, 'search');
  if (isNative && search) {
    const params = queryStringFromString(search);
    if (params.scrollTop === 'keep') {
      keepScrollLocation = true;
    }
  }
  if (!keepScrollLocation) {
    window.scrollTo(0, 0);
  }
});

export default history;
