/*
 * Drums Messages
 *
 * This contains all the text for the Drums container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Drums';

export default defineMessages({
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
