import React from 'react';
import { render } from 'react-testing-library';

import TracksContainer from '../TracksContainer';

describe('<TracksContainer />', () => {
  const config = ['Track1', 'Track2', 'Track3', 'Track4'];
  const sounds = {
    Track1: 'https://web-daw.s3.us-east-2.amazonaws.com/kick.wav',
    Track2: 'https://web-daw.s3.us-east-2.amazonaws.com/snare1.wav',
    Track3: 'https://web-daw.s3.us-east-2.amazonaws.com/hatClosed.wav',
    Track4: 'https://web-daw.s3.us-east-2.amazonaws.com/hatOpen.wav',
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <React.Suspense fallback={<p>loading</p>}>
        <TracksContainer config={config} sounds={sounds} />
      </React.Suspense>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <React.Suspense fallback={<p>loading</p>}>
        <TracksContainer config={config} sounds={sounds} />
      </React.Suspense>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
