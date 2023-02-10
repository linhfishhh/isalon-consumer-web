/**
 *
 * Asynchronously loads the component for ProductHomePage
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import { isMobileOnly } from 'utils/platform';
import LoadingIndicator from 'components/LoadingIndicator';

export default loadable(() => import('./index'), {
  fallback: isMobileOnly ? <></> : <LoadingIndicator />,
});
