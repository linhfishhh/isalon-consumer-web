/**
 *
 * Asynchronously loads the component for AddressBook
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
