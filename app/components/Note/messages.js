/*
 * Note Messages
 *
 * This contains all the text for the Note component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Note';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Note component!',
  },
});
