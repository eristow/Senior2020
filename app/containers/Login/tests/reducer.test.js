import produce from 'immer';
import loginReducer from '../reducer';
import { changeEmail, changePass } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('loginReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      email: '',
      pass: '',
      body: '',
      showOk: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(loginReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeEmail action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.email = 'changed@email.com';
    });

    expect(loginReducer(state, changeEmail('changed@email.com'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changePass action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.pass = 'password';
    });

    expect(loginReducer(state, changePass('password'))).toEqual(expectedResult);
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
