import Tone from 'tone';
// eslint-disable-next-line camelcase
import { unstable_createResource } from 'react-cache';

export const bufferResource = unstable_createResource(
  url =>
    new Promise(resolve => {
      console.log(url);
      const buffer = new Tone.Player(url, () => {
        console.log(url);
        resolve(buffer);
      }).toMaster();
    }),
);
