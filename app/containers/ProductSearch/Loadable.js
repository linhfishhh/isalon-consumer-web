/**
 *
 * Asynchronously loads the component for ProductSearch
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
