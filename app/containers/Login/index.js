/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import H1 from 'components/H1';
import P from 'components/P';
import InputText from 'components/InputText';
import Button from 'components/Button';
// import LoginForm from 'components/LoginForm';
import { changeEmail, changePass, login } from './actions';
import makeSelectLogin, { makeSelectEmail, makeSelectPass } from './selectors';
import reducer from './reducer';
import saga from './saga';

const Container = styled.div`
  max-width: 800px;
  background: #66666600;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 50%;
  background: #555555;
  border: 2px solid black;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: white;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

export function Login({ email, setEmail, pass, setPass, handleSubmit }) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  return (
    <Container>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login Page" />
      </Helmet>
      <TitleContainer>
        <H1>Login</H1>
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
        <P>
          {"Don't have an account? Click "}
          <a href="/register">here</a>
          {'.'}
        </P>
      </TitleContainer>
    </Container>
  );
}

Login.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
  setEmail: PropTypes.func,
  pass: PropTypes.string,
  setPass: PropTypes.func,
  handleSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
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
      dispatch(login(state));
      //   e.preventDefault();
      //   dispatch(login(e.target.value))
      //   // if(this.isValid()) {
      //   //   this.ListenxingStateChangedEvent({ errors: {}, isLoading: true });
      //   //   this.props.login(this.state).then(
      //   //     (res) => this.context.router.push('/'),
      //   //     (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      //   //   );
      //   // }
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

export default compose(
  withConnect,
  memo,
)(Login);
