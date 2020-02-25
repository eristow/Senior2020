/**
 *
 * Tests for Note
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import Note from '../index';

describe('<Note />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Note />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Note />);
    expect(firstChild).toMatchSnapshot();
  });

  it('Should handle click on NoteWhite', () => {
    const onClickMock = jest.fn();
    const name = 'White Note';
    const props = {
      name,
      color: 'white',
      onClick: onClickMock,
    };

    const { container } = render(<Note {...props} />);

    fireEvent.click(container.querySelector('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('Should handle click on NoteBlack', () => {
    const onClickMock = jest.fn();
    const name = 'Black Note';
    const props = {
      name,
      color: 'black',
      onClick: onClickMock,
    };

    const { container } = render(<Note {...props} />);

    fireEvent.click(container.querySelector('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
