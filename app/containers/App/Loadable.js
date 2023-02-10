/**
 *
 * Asynchronously loads the component for AppMobile
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
