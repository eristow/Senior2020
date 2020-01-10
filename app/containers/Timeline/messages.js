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
