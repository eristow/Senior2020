/**
 *
 * Tests for Auth
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

// import sinon from 'sinon';
import Auth from '../index';

describe('<Auth />', () => {
  const replaceMock = jest.fn();
  const reloadMock = jest.fn();

  delete window.location;
  window.location = { replace: replaceMock, reload: reloadMock };

  afterEach(() => {
    replaceMock.mockClear();
    reloadMock.mockClear();
  });

  it('Expect to not log errors in console', () => {
    window.location.assign = jest.fn();
    const spy = jest.spyOn(global.console, 'error');
    render(<Auth />);
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Auth />);
    expect(firstChild).toMatchSnapshot();
  });
});
