/*
 * DrumMachine Messages
 *
 * This contains all the text for the DrumMachine container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DrumMachine';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Drum Machine',
  },
  masterVol: {
    id: `${scope}.masterVol`,
    defaultMessage: 'Master Volume',
  },
  tempo: {
    id: `${scope}.tempo`,
    defaultMessage: 'Tempo',
  },
  drumKits: {
    id: `${scope}.drumKits`,
    defaultMessage: 'Drum Kits',
  },
  kit1: {
    id: `${scope}.kit1`,
    defaultMessage: 'Kit 1',
  },
  kit2: {
    id: `${scope}.kit2`,
    defaultMessage: 'Kit 2',
  },
  kit3: {
    id: `${scope}.kit3`,
    defaultMessage: 'Kit 3',
  },
  play: {
    id: `${scope}.play`,
    defaultMessage: 'Play',
  },
  stop: {
    id: `${scope}.stop`,
    defaultMessage: 'Stop',
  },
  snare: {
    id: `${scope}.snare`,
    defaultMessage: 'Snare',
  },
  kick: {
    id: `${scope}.kick`,
    defaultMessage: 'Kick',
  },
});
