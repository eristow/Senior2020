import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';

import { TrackConfig } from '../TrackConfig';

describe('<TrackConfig />', () => {
  let store;
  const vol = [0, 0, 0, 0];
  const buffer = { volume: { value: 0 } };
  const trackNames = ['Track 1', 'Track 2', 'Track 3', 'Track 4'];

  beforeAll(() => {
    store = configureStore();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();

    render(
      <Provider store={store}>
        <TrackConfig
          dispatch={dispatch}
          vol={vol}
          buffer={buffer}
          trackNames={trackNames}
        />
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <TrackConfig vol={vol} buffer={buffer} trackNames={trackNames} />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
