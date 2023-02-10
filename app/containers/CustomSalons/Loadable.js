/**
 *
 * Asynchronously loads the component for CustomSalons
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
