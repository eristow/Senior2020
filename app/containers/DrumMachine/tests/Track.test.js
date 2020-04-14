import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';

import { Track } from '../Track';

describe('<Track />', () => {
  let store;
  const name = 'Snare';
  const trackVol = { Snare: 0 };
  const buffer = { volume: { value: 0 } };
  const setBuffers = jest.fn();

  beforeAll(() => {
    store = configureStore();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Track
          dispatch={dispatch}
          buffer={buffer}
          name={name}
          trackVol={trackVol}
          setBuffers={setBuffers}
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
        <Track
          buffer={buffer}
          name={name}
          trackVol={trackVol}
          setBuffers={setBuffers}
        />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
