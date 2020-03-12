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

  beforeAll(() => {
    store = configureStore();
  });

  // TODO: gave up trying to write test
  it.skip('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();

    render(
      <Provider store={store}>
        <TracksContainer dispatch={dispatch} config={config} />
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  // TODO: gave up trying to write test
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <TracksContainer config={config} />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
