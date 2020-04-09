import React from 'react';
import { render } from 'react-testing-library';

import TracksContainer from '../TracksContainer';

describe('<TracksContainer />', () => {
  const config = ['Track1', 'Track2', 'Track3', 'Track4'];
  const tracks = [
    {
      key: 'Track1',
      name: 'Track 1',
      sound: 'https://web-daw.s3.us-east-2.amazonaws.com/kick.wav',
    },
    {
      key: 'Track2',
      name: 'Track 2',
      sound: 'https://web-daw.s3.us-east-2.amazonaws.com/snare1.wav',
    },
    {
      key: 'Track3',
      name: 'Track 3',
      sound: 'https://web-daw.s3.us-east-2.amazonaws.com/hatClosed.wav',
    },
    {
      key: 'Track4',
      name: 'Track 4',
      sound: 'https://web-daw.s3.us-east-2.amazonaws.com/hatOpen.wav',
    },
  ];

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <React.Suspense fallback={<p>loading</p>}>
        <TracksContainer config={config} tracks={tracks} />
      </React.Suspense>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <React.Suspense fallback={<p>loading</p>}>
        <TracksContainer config={config} tracks={tracks} />
      </React.Suspense>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
