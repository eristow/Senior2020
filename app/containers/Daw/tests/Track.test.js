import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';

import { Track } from '../Track';

describe('<Track />', () => {
  let store;
  const stepState = {
    Track1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Track2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Track3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Track4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };
  const name = 'Track1';
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
          name={name}
          stepState={stepState}
          buffer={buffer}
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
          name={name}
          stepState={stepState}
          buffer={buffer}
          setBuffers={setBuffers}
        />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
