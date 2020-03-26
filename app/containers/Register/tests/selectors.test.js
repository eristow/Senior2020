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
      const emailState = {
        email: 'changed@email.com',
      };
      const mockedState = {
        login: {
          email: emailState,
        },
      };

      expect(selectedEmailSelector(mockedState)).toEqual(emailState);
    });
  });
  describe('makeSelectPass', () => {
    const selectedPassSelector = makeSelectPass();
    it('Should select the selected password', () => {
      const passState = {
        pass: 'password',
      };
      const mockedState = {
        login: {
          pass: passState,
        },
      };

      expect(selectedPassSelector(mockedState)).toEqual(passState);
    });
  });
});
