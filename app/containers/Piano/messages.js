/*
 * Piano Messages
 *
 * This contains all the text for the Piano container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Piano';

export default defineMessages({
  piano: {
    id: `${scope}.piano`,
    defaultMessage: 'Piano: Type letter on key, or click on key to play.',
  },
});
