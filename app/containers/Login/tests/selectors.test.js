import {
  selectLoginDomain,
  makeSelectEmail,
  makeSelectPass,
} from '../selectors';

describe('selectLoginDomain', () => {
  // it('Expect to have unit tests specified', () => {
  //   expect(true).toEqual(false);
  // });
  describe('selectLoginDomain', () => {
    it('Should select the Login domain', () => {
      const loginState = {
        loginStateData: {},
      };
      const mockedState = {
        login: loginState,
      };

      expect(selectLoginDomain(mockedState)).toEqual(loginState);
    });
  });
  describe('makeSelectEmail', () => {
    const selectedEmailSelector = makeSelectEmail();
    it('Should select the selected config', () => {
      const email = 'changed@email.com';
      const mockedState = {
        login: {
          email,
        },
      };

      expect(selectedEmailSelector(mockedState)).toEqual(email);
    });
  });
  describe('makeSelectPass', () => {
    const selectedPassSelector = makeSelectPass();
    it('Should select the selected password', () => {
      const pass = 'password';
      const mockedState = {
        login: {
          pass,
        },
      };

      expect(selectedPassSelector(mockedState)).toEqual(pass);
    });
  });
});
