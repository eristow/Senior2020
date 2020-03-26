import {
  login,
  loginSuccess,
  loginError,
  changeEmail,
  changePass,
} from '../actions';
import {
  CHANGE_EMAIL,
  CHANGE_PASS,
  LOGGING_IN,
  LOGGED_IN,
  LOGIN_FAILED,
} from '../constants';
describe('Login actions', () => {
  describe('Change Email', () => {
    it('has a type of CHANGE_EMAIL', () => {
      const expected = {
        type: CHANGE_EMAIL,
        value: 'changed@email.com',
      };
      expect(changeEmail('changed@email.com')).toEqual(expected);
    });
  });
  describe('Change Email', () => {
    it('has a type of CHANGE_PASS', () => {
      const expected = {
        type: CHANGE_PASS,
        value: 'PASSW0RD',
      };
      expect(changePass('PASSW0RD')).toEqual(expected);
    });
  });
  describe('Starting register', () => {
    it('has a type of REGISTERING', () => {
      const expected = {
        type: LOGGING_IN,
        value: { email: 'changed@email.com', pass: 'PASSW0RD' },
      };
      expect(login({ email: 'changed@email.com', pass: 'PASSW0RD' })).toEqual(
        expected,
      );
    });
  });
  describe('Login fetch success', () => {
    it('has a type of LOGGED_IN', () => {
      const expected = {
        type: LOGGED_IN,
        value: { email: 'changed@email.com' },
      };
      expect(loginSuccess({ email: 'changed@email.com' })).toEqual(expected);
    });
  });
  describe('Login fetch failed', () => {
    it('has a type of LOGIN_FAILED', () => {
      const expected = {
        type: LOGIN_FAILED,
        value: { response: {} },
      };
      expect(loginError({ response: {} })).toEqual(expected);
    });
  });
});
