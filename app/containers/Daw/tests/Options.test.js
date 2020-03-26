import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';

import { Options } from '../Options';

describe('<Options />', () => {
  let store;
  const menuStates = {
    File: false,
    Edit: false,
    View: false,
    Help: false,
  };

  beforeAll(() => {
    store = configureStore();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Options dispatch={dispatch} menuStates={menuStates} />
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <Options menuStates={menuStates} />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
