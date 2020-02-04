/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  machine: {
    id: `${scope}.machine`,
    defaultMessage: 'Machine',
  },
  timeline: {
    id: `${scope}.timeline`,
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
