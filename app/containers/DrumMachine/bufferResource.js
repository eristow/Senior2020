import Tone from 'tone';
// eslint-disable-next-line camelcase
// TODO: can i use another library
import { unstable_createResource } from 'react-cache';

export const bufferResource = unstable_createResource(
  url =>
    new Promise(resolve => {
      const buffer = new Tone.Player(url, () => {
        resolve(buffer);
      }).toMaster();
    }),
);
