/**
 *
 * Asynchronously loads the component for Drums
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
