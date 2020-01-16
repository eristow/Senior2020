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
    defaultMessage: 'Piano: Type letter on key, or click on key to play.',
  },
  drums: {
    id: `${scope}.drums`,
    defaultMessage: 'Drums:',
  },
  kick: {
    id: `${scope}.kick`,
    defaultMessage: 'Kick',
  },
  snare: {
    id: `${scope}.snare`,
    defaultMessage: 'Snare',
  },
  hat: {
    id: `${scope}.hat`,
    defaultMessage: 'Hat',
  },
});
