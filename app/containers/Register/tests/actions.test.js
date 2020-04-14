import {
  register,
  registerSuccess,
  registerError,
  changeEmail,
  changePass,
} from '../actions';
import {
  CHANGE_EMAIL,
  CHANGE_PASS,
  REGISTERING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../constants';

describe('Register actions', () => {
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
        type: REGISTERING,
        value: { email: 'changed@email.com', pass: 'PASSW0RD' },
      };
      expect(
        register({ email: 'changed@email.com', pass: 'PASSW0RD' }),
      ).toEqual(expected);
    });
  });
  describe('Register fetch success', () => {
    it('has a type of REGISTER_SUCCESS', () => {
      const expected = {
        type: REGISTER_SUCCESS,
        value: { message: 'User registered successfully' },
      };
      expect(
        registerSuccess({ message: 'User registered successfully' }),
      ).toEqual(expected);
    });
  });
  describe('Register fetch failed', () => {
    it('has a type of REGISTER_FAILED', () => {
      const expected = {
        type: REGISTER_FAILED,
        value: { response: {} },
      };
      expect(registerError({ response: {} })).toEqual(expected);
    });
  });
});
