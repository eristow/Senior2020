/**
 *
 * Tests for SignOut
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import SignOut from '../index';

describe('<SignOut />', () => {
  const replaceMock = jest.fn();
  const reloadMock = jest.fn();

  delete window.location;
  window.location = { replace: replaceMock, reload: reloadMock };

  afterEach(() => {
    replaceMock.mockClear();
    reloadMock.mockClear();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<SignOut />);
    expect(spy).not.toHaveBeenCalled();
  });

  it.skip('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<SignOut />);
    expect(firstChild).toMatchSnapshot();
  });
});
