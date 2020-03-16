import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';

import { SideBar } from '../SideBar';

describe('<SideBar />', () => {
  let store;

  beforeAll(() => {
    store = configureStore();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SideBar dispatch={dispatch} />
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <SideBar />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
