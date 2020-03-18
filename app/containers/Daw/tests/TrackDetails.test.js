import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';

import { TrackDetails } from '../TrackDetails';

describe('<TrackDetails />', () => {
  let store;
  const track = { name: 'Track 1' };

  beforeAll(() => {
    store = configureStore();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();

    render(
      <Provider store={store}>
        <TrackDetails dispatch={dispatch} track={track} />
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <TrackDetails track={track} />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
