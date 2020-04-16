import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';

import { ExportButton } from '../ExportButton';

describe('<ExportButton />', () => {
  let store;

  beforeAll(() => {
    store = configureStore();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();

    render(
      <Provider store={store}>
        <ExportButton dispatch={dispatch} />
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <ExportButton />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
