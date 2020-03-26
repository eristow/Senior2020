import produce from 'immer';
import registerReducer from '../reducer';
import { changeEmail, changePass } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('registerReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      email: '',
      pass: '',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(registerReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeEmail action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.email = 'changed@email.com';
      draft.error = false;
      draft.userData.nested = false;
    });

    expect(registerReducer(state, changeEmail('changed@email.com'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changePass action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.pass = 'password';
    });

    expect(registerReducer(state, changePass('password'))).toEqual(
      expectedResult,
    );
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
