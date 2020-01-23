/*
 * Timeline Messages
 *
 * This contains all the text for the Timeline container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Timeline';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Timeline',
  },
  piano: {
    id: `${scope}.piano`,
    defaultMessage: 'Piano',
  },
  drums: {
    id: `${scope}.drums`,
    defaultMessage: 'Drums',
  },
});
