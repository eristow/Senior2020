import {
  selectRegisterDomain,
  makeSelectEmail,
  makeSelectPass,
} from '../selectors';

describe('selectRegisterDomain', () => {
  // it('Expect to have unit tests specified', () => {
  //   expect(true).toEqual(false);
  // });
  describe('selectRegisterDomain', () => {
    it('Should select the Register domain', () => {
      const registerState = {
        registerStateData: {},
      };
      const mockedState = {
        register: registerState,
      };

      expect(selectRegisterDomain(mockedState)).toEqual(registerState);
    });
  });
  describe('makeSelectEmail', () => {
    const selectedEmailSelector = makeSelectEmail();
    it('Should select the selected config', () => {
      const email = 'changed@email.com';
      const mockedState = {
        register: {
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
        register: {
          pass,
        },
      };

      expect(selectedPassSelector(mockedState)).toEqual(pass);
    });
  });
});
