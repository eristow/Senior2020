/**
 *
 * Register
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import H2 from 'components/H2';
import InputText from 'components/InputText';
import Button from 'components/Button';
// import RegisterForm from 'components/RegisterForm';
import { changeEmail, changePass, register } from './actions';
import makeSelectRegister, {
  makeSelectEmail,
  makeSelectPass,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

const Container = styled.div`
  max-width: 800px;
  background: #666666;
  border: 2px solid black;
  border-radius: 4px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: white;
`;

export function Register({ email, setEmail, pass, setPass, handleSubmit }) {
  useInjectReducer({ key: 'register', reducer });
  useInjectSaga({ key: 'register', saga });

  return (
    <Container>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Description of Register" />
      </Helmet>
      <H2>Register</H2>
      <InputContainer>
        <Label>Email: </Label>
        <InputText
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          width="15em"
        />
      </InputContainer>
      <InputContainer>
        <Label>Password: </Label>
        <InputText
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          width="15em"
        />
      </InputContainer>
      <Button
        type="button"
        onClick={() => handleSubmit(email, pass)}
        text="Submit"
      />
    </Container>
  );
}

Register.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
  setEmail: PropTypes.func,
  pass: PropTypes.string,
  setPass: PropTypes.func,
  handleSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  register: makeSelectRegister(),
  email: makeSelectEmail(),
  pass: makeSelectPass(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleSubmit: (currEmail, currPass) => {
      const state = {
        email: currEmail,
        pass: currPass,
      };
      dispatch(register(state));
    },
    setEmail: e => {
      dispatch(changeEmail(e));
    },
    setPass: e => {
      dispatch(changePass(e));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Register);
