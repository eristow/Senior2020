import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';

import TracksContainer from '../TracksContainer';

describe('<TracksContainer />', () => {
  let store;
  const config = {
    tracks: ['Snare'],
    samples: ['snareSample'],
  };
  const size = {
    width: 1920,
    height: 1080,
  };

  beforeAll(() => {
    store = configureStore();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();

    render(
      <Provider store={store}>
        <React.Suspense fallback={<p>loading</p>}>
          <TracksContainer dispatch={dispatch} config={config} size={size} />
        </React.Suspense>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <React.Suspense fallback={<p>loading</p>}>
          <TracksContainer config={config} size={size} />
        </React.Suspense>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
