/**
 *
 * Tests for Timeline
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { Timeline } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<Timeline />', () => {
  let store;

  beforeAll(() => {
    store = configureStore();
  });

  // TODO: not using this file, so test is commented out
  it.skip('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <Timeline dispatch={dispatch} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  // TODO: not using this file, so test is commented out
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <Timeline />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
